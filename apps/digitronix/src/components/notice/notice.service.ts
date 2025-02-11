import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeInput, NoticeInquiry } from '../../libs/dto/notice/notice.input';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { Message } from '../../libs/common';

@Injectable()
export class NoticeService {
    constructor(@InjectModel("Notice") readonly noticeModel: Model<Notice>) { }

    async createNotice(input: NoticeInput): Promise<Notice> {
        try {
            const result = await this.noticeModel.create(input);
            return result
        } catch (err) {
            console.log(`DB ERROR:createNotice, ${err.message} `)
            throw err
        }
    }

    async getAllNotices(input: NoticeInquiry): Promise<Notices> {
        const { page, limit, search, sort, direction } = input;
        const match: T = {}
        if (search.noticeRead) match.noticeRead = search.noticeRead;
        const sorting: T = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }
        const facetagg = []
        if (page) facetagg.push({ $skip: (page - 1) * limit })
        facetagg.push({ $limit: limit })
        const result = await this.noticeModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: facetagg,
                    metaCounter: [{ $count: "total" }]
                }
            }
        ])
        return result[0]
    }


    async deleteTargetNotice(targetId: ObjectId): Promise<Notice> {
        const exist = await this.noticeModel.findById(targetId).exec()
        if (!exist) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        const result = await this.noticeModel.findByIdAndDelete(targetId).exec();
        return result
    }
}
