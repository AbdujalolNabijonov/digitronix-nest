import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentInput } from '../../libs/dto/comment/comment.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/types/config';
import { UpdateComment } from '../../libs/dto/comment/comment.update';
import { Comment } from '../../libs/dto/comment/comment';

@Resolver()
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @UseGuards(AuthGuard)
    @Mutation(() => Comment)
    public async createComment(
        @Args("input") input: CommentInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Comment> {
        console.log("Mutation: createComment");
        return await this.commentService.createComment(input, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Comment)
    public async updateComment(
        @Args("input") input: UpdateComment,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Comment> {
        console.log("Mutation: updateComment")
        return await this.commentService.updateComment(input, memberId)
    }
    getComments() { }
    likeTargetComment() { }

    //Admin
    removeCommmentByAdmin() { }
}
