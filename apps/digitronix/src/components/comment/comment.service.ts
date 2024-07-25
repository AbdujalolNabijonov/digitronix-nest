import { Injectable, InternalServerErrorException, Search } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentInput, CommentInquiry } from '../../libs/dto/comment/comment.input';
import { Message } from '../../libs/common';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { ArticleService } from '../article/article.service';
import { MemberService } from '../member/member.service';
import { ProductService } from '../product/product.service';
import { ProductType } from '../../libs/enums/product.enum';
import { UpdateComment } from '../../libs/dto/comment/comment.update';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookUpMember, shapeIntoMongoObjectId } from '../../libs/types/config';
import { T } from '../../libs/types/general';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel("Comment") private readonly commentModel: Model<Comment>,
        private readonly articleService: ArticleService,
        private readonly memberService: MemberService,
        private readonly productSevice: ProductService,
        private readonly likeService: LikeService
    ) { }

    public async createComment(input: CommentInput, memberId: ObjectId): Promise<Comment> {
        try {
            const commentyInput = {
                ...input,
                memberId
            }

            await this.targetRefStatsEdit(input.commentGroup, input.commentTargetId, 1)
            const newComment = await this.commentModel.create(commentyInput);
            if (!newComment) throw new InternalServerErrorException(Message.CREATE_FAILED);

            return newComment
        } catch (err: any) {
            console.log("Error: Service.model, ", err.message);
            throw new InternalServerErrorException(Message.CREATE_FAILED)
        }
    }

    public async updateComment(input: UpdateComment, membeId: ObjectId): Promise<Comment> {
        const search = {
            _id: input._id,
            commentStatus: CommentStatus.ACTIVE
        }
        const existance = await this.commentModel.findOne(search).lean().exec()
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        if (input.commentStatus === CommentStatus.DELETE) {
            input.deletedAt = moment().toDate()
            await this.targetRefStatsEdit(existance.commentGroup, existance.commentTargetId, -1)
        }

        const result = await this.commentModel.findOneAndUpdate(search, input, { new: true }).exec();
        if (!result) throw new InternalServerErrorException(Message.CREATE_FAILED);
        return result
    }

    public async getAllComments(input: CommentInquiry, memberId: ObjectId): Promise<Comments> {
        const { commentTargetId } = input.search;
        const match: T = { commentStatus: CommentStatus.ACTIVE }
        if (commentTargetId) match.commentTargetId = shapeIntoMongoObjectId(commentTargetId);

        const result = await this.commentModel.aggregate([
            { $match: match },
            {
                $facet: {
                    list: [
                        { $skip: (input.page - 1) * input.limit },
                        { $limit: input.limit },
                        lookUpMember,
                        lookupAuthMemberLiked(memberId, "$_id"),
                        { $unwind: "$memberData" }
                    ],
                    metaCounter: [
                        { $count: "total" }
                    ]

                }
            }
        ])

        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async likeTargetComment(likeTargetId: ObjectId, memberId: ObjectId): Promise<Comment> {
        const search = {
            _id: likeTargetId,
            commentStatus: CommentStatus.ACTIVE
        }
        const existance = await this.commentModel.findOne(search).lean().exec()
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        const likeInput: LikeInput = {
            memberId,
            likeTargetId,
            likeGroup: existance.commentGroup
        }
        const modifier = await this.likeService.likeTargetToggle(likeInput);

        const result = await this.commentStatsEdit(likeTargetId, modifier, "commentLikes");
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        return result
    }

    public async targetRefStatsEdit(commentGroup: string, commentTargetId: ObjectId, modifier: number): Promise<void> {
        switch (commentGroup) {
            case CommentGroup.ARTICLE:
                await this.articleService.articleStatsEditor(commentTargetId, modifier, "artileComments");
                break;
            case CommentGroup.DESKTOP:
                await this.productSevice.productStatsEdit(commentTargetId, modifier, "productComments", ProductType.DESKTOP);
                break;
            case CommentGroup.LAPTOP:
                await this.productSevice.productStatsEdit(commentTargetId, modifier, "productComments", ProductType.LAPTOP);
                break;
            case CommentGroup.MEMBER:
                await this.memberService.memberStatsEdit(commentTargetId, modifier, "memberComments");
                break;
            case CommentGroup.PERIPHERAL:
                await this.productSevice.productStatsEdit(commentTargetId, modifier, "productComments", ProductType.PERIPHERAL);
                break;
            default:
                break;
        }
    }

    public async removeCommmentByAdmin(commentId: ObjectId): Promise<Comment> {
        const result = await this.commentModel.findByIdAndDelete(commentId);
        if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED)
        await this.targetRefStatsEdit(result.commentGroup, result.commentTargetId, -1)
        return result
    }

    public async commentStatsEdit(commentId: ObjectId, modifier: number, dataSet: string): Promise<Comment> {
        return await this.commentModel.findByIdAndUpdate(commentId, { $inc: { [dataSet]: modifier } }, { new: true }).exec();
    }

}
