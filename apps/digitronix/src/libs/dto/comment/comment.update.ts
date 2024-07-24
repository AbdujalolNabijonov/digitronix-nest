import { Field, InputType } from "@nestjs/graphql";
import { CommentGroup, CommentStatus } from "../../enums/comment.enum";
import { ObjectId } from "mongoose";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

@InputType()
export class UpdateComment {
    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId

    @IsOptional()
    @Field(() => CommentStatus, { nullable: true })
    commentStatus: CommentStatus

    @IsOptional()
    @Length(5, 500)
    @Field(() => String, { nullable: true })
    commentContent: string

    deletedAt:Date
}