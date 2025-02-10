import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { FaqInput, FaqInquiry } from '../../libs/dto/faq/faq.input';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { Message } from '../../libs/common';

@Injectable()
export class FaqService {
    constructor(@InjectModel("Faq") readonly faqModel: Model<Faq>) { }

    async createFaq(memberId: ObjectId, input: FaqInput): Promise<Faq> {
        try {
            input.memberId = memberId
            const result = await this.faqModel.create(input);
            return result
        } catch (err: any) {
            console.log(`Error: createFaq, ${err.message}`)
            throw err
        }
    }

    async getTargetFaqs(input: FaqInquiry): Promise<Faqs> {
        const { page, limit, search, sort, } = input;
        const match: T = {}
        if (search.faqCategory) match.faqCategory = search.faqCategory;
        if (search.text) match.faqQuestion = { $regex: new RegExp(search.text, "i") };

        const sorting: T = {
            [sort ?? 'createdAt']: Direction.ASC
        }

        const result = await this.faqModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec();

        if (result[0].list.length < 1) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    async deleteTargetFaq(targetId: ObjectId): Promise<Faq> {
        const exist = await this.faqModel.findById(targetId).exec();
        if (!exist) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const result = await this.faqModel.findByIdAndDelete(targetId).exec();
        return result
    }
}
