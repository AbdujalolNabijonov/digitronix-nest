import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CommentGroup, CommentStatus } from "../../enums/comment.enum";

@ObjectType()
export class Comment {
    @Field(() => String)
    _id: ObjectId

    @Field(() => CommentStatus)
    commentStatus: string

    @Field(() => CommentGroup)
    commentGroup: string

    @Field(() => String)
    commentContent: string

    @Field(() => String)
    commentTargetId: ObjectId

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Number)
    commentRank: number

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}
