import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Article, Articles } from '../../libs/dto/article/article';
import { ArticleInput, ArticlesInquiry } from '../../libs/dto/article/article.input';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { UpdateArticle } from '../../libs/dto/article/article.update';
import { T } from '../../libs/types/general';
import { ArticleStatus } from '../../libs/enums/article.enum';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookUpMember, shapeIntoMongoObjectId } from '../../libs/config';
import { ViewService } from '../view/view.service';
import { ViewInput } from '../../libs/dto/view/view.input';
import { ViewGroup } from '../../libs/enums/view.enum';
import { Direction } from '../../libs/enums/common.enum';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel("Article") private readonly articleModel: Model<Article>,
        private readonly memberService: MemberService,
        private readonly viewSevice: ViewService,
        private readonly likeService: LikeService
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
            lookupAuthMemberLiked(memberId),
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

    public async getAllArticles(input: ArticlesInquiry, authMemberId: ObjectId): Promise<Articles> {

        const { page, limit, direction, sort, search } = input
        let { articleCategory, articleStatus, text, memberId } = search;
        memberId = shapeIntoMongoObjectId(memberId);

        const match: T = {articleStatus:ArticleStatus.ACTIVE}
        if (memberId) match.memberId = memberId
        if (articleCategory) match.articleCategory = articleCategory;
        if (articleStatus) match.articleStatus = articleStatus;
        if (text) match.articleTitle = { $regex: new RegExp(text, "i") };

        const sorting:T = { [sort ?? "createdAt"]: direction ?? Direction.DESC }

        const result = await this.articleModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupAuthMemberLiked(authMemberId),
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec();

        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async likeTargetArticle(targetArticleId: ObjectId, memberId: ObjectId): Promise<Article> {
        const search = {
            _id: targetArticleId,
            articleStatus: ArticleStatus.ACTIVE
        }

        const existance = await this.articleModel.findOne(search).exec();
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const likeInput: LikeInput = {
            memberId,
            likeTargetId: targetArticleId,
            likeGroup: LikeGroup.ARTICLE
        }
        const modifier = await this.likeService.likeTargetToggle(likeInput);
        const result = await this.articleStatsEditor(targetArticleId, modifier, "articleLikes")

        if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return result
    }

    //ADMIN
    public async updateArticleByAdmin(input: UpdateArticle): Promise<Article> {
        const search = {
            _id: input._id,
            articleStatus: ArticleStatus.ACTIVE
        }

        const existance = await this.articleModel.findOne(search);
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        if (input.articleStatus === ArticleStatus.DELETE) {
            input.deletedAt = moment().toDate()
            await this.memberService.memberStatsEdit(existance.memberId, -1, "memberArticles")
        }

        const result = await this.articleModel.findOneAndUpdate(search, input, { new: true });
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result
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

    public async getAllArticlesByAdmin(input: ArticlesInquiry): Promise<Articles> {
        const { page, limit, direction, sort, search } = input
        const { articleStatus, articleCategory, text } = search

        const match: T = {}
        if (articleCategory) match.articleCategory = articleCategory;
        if (articleStatus) match.articleStatus = articleStatus;
        if (text) match.articleTitle = { $regex: new RegExp(text, "i") };

        const sorting: T = {
            [sort ?? "careatedAt"]: direction ?? Direction.DESC
        }

        const result = await this.articleModel.aggregate([
            { $match: match },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookUpMember,
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [
                        { $count: "total" }
                    ]
                }
            }
        ]).exec();

        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async removeArticelByAdmin(targetArticleId:string): Promise<Article> {

        const search: T = {
            _id: targetArticleId,
            articleStatus: ArticleStatus.DELETE
        }
        const existance = await this.articleModel.findOne(search);

        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        const result = await this.articleModel.findOneAndDelete(search).exec()
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
        return result
    }
}
