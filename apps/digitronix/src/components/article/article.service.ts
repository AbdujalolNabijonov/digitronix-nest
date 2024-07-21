import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Article } from '../../libs/dto/article/article';
import { ArticleInput } from '../../libs/dto/article/article.input';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { UpdateArticle } from '../../libs/dto/article/article.update';
import { T } from '../../libs/types/general';
import { ArticleStatus } from '../../libs/enums/article.enum';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookUpMember } from '../../libs/types/config';
import { ViewService } from '../view/view.service';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel("Article") private readonly articleModel: Model<Article>,
        private readonly memberService: MemberService,
        private readonly viewSevice: ViewService
    ) { }

    public async createArticle(input: ArticleInput, memberId: ObjectId): Promise<Article> {
        try {
            const articleInput = {
                memberId,
                ...input
            }
            const result = await this.articleModel.create(articleInput);
            if (result) {
                await this.memberService.memberStatsEdit(memberId, 1, "memberArticles");
            }
            return result
        } catch (err: any) {
            console.log("Error: Service.model, ", err.message)
            throw new InternalServerErrorException(Message.CREATE_FAILED)
        }
    }

    public async updateArticle(input: UpdateArticle, memberId: ObjectId): Promise<Article> {
        const search: T = {
            _id: input._id,
            articleStatus: ArticleStatus.ACTIVE
        }
        const existance = await this.articleModel.findOne(search).lean().exec()
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const updateInput: T = {
            ...input,
        }
        if (input.articleStatus === ArticleStatus.DELETE) {
            updateInput.deletedAt = moment().toDate();
            await this.memberService.memberStatsEdit(existance.memberId, -1, "memberArticles")
        }
        const result = await this.articleModel.findOneAndUpdate(search, updateInput, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED)
        return result
    }

    public async getArticle(
        targetArticleId: ObjectId,
        memberId: ObjectId
    ): Promise<Article> {
        const search: T = {
            _id: targetArticleId,
            articleStatus: ArticleStatus.ACTIVE
        }
        let result = await this.articleModel.aggregate([
            { $match: search },
            lookUpMember,
            lookupAuthMemberLiked(memberId, "_id"),
            { $unwind: "$memberData" }
        ]).exec()
        if (!result) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        if (memberId) {
            const viewInput: ViewInput = {
                memberId,
                viewTargetId: targetArticleId,
                viewGroup: ViewGroup.ARTICLE
            }
            const existanceView = await this.viewSevice.recordView(viewInput)
            if (existanceView) {
                await this.articleStatsEditor(targetArticleId, 1, "articleViews")
                result[0].articleViews++
            }
        }
        return result[0]
    }

    public async articleStatsEditor(targetArticleId: ObjectId, modifier: number, dataSet: string): Promise<Article> {
        const search: T = {
            _id: targetArticleId,
            articleStatus: ArticleStatus.ACTIVE
        }
        const updatedDocument = await this.articleModel.findOneAndUpdate(search, { $inc: { [dataSet]: modifier } }, { new: true }).exec();
        if (!updatedDocument) throw new InternalServerErrorException(Message.UPDATE_FAILED)
        return updatedDocument
    }
}
