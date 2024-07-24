import { Injectable, InternalServerErrorException, Search } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentInput } from '../../libs/dto/comment/comment.input';
import { Message } from '../../libs/common';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { ArticleService } from '../article/article.service';
import { MemberService } from '../member/member.service';
import { ProductService } from '../product/product.service';
import { ProductType } from '../../libs/enums/product.enum';
import { UpdateComment } from '../../libs/dto/comment/comment.update';
import { Comment } from '../../libs/dto/comment/comment';
import * as moment from 'moment';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel("Comment") private readonly commentModel: Model<Comment>,
        private readonly articleService: ArticleService,
        private readonly memberService: MemberService,
        private readonly productSevice: ProductService
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

    public async commentStatsEdit() { }
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
}
