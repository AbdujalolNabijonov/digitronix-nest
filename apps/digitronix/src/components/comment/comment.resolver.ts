import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CommentInput, CommentInquiry } from '../../libs/dto/comment/comment.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { UpdateComment } from '../../libs/dto/comment/comment.update';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { WithoutGuards } from '../auth/guards/without.guard';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/enums/member';
import { RolesGuard } from '../auth/guards/roles.guard';

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

    @UseGuards(WithoutGuards)
    @Query(returns => Comments)
    public async getAllComments(
        @Args("input") input: CommentInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Comments> {
        console.log("Query: getAllComments");
        return await this.commentService.getAllComments(input, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Comment)
    public async likeTargetComment(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Comment> {
        console.log("Mutation: likeTargetComment");
        const likeTargetId = shapeIntoMongoObjectId(input)
        return await this.commentService.likeTargetComment(likeTargetId, memberId)
    }

    //Admin
    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(()=>Comment)
    public async removeCommmentByAdmin(
        @Args("input") input:String
    ):Promise<Comment> { 
        console.log("Mutation: removeCommmentByAdmin");
        const commentId = shapeIntoMongoObjectId(input);
        return await this.commentService.removeCommmentByAdmin(commentId)
    }
}
