import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Length, Max, Min } from "class-validator";
import { CommentGroup } from "../../enums/comment.enum";
import { ObjectId } from "mongoose";

@InputType()
export class CommentInput {
    @IsNotEmpty()
    @Field(() => CommentGroup)
    commentGroup: CommentGroup

    @IsNotEmpty()
    @Length(5, 500)
    @Field(() => String)
    commentContent: string

    @IsNotEmpty()
    @Min(0)
    @Max(5)
    @Field(() => Number)
    commentRank: number

    @IsNotEmpty()
    @Field(() => String)
    commentTargetId: ObjectId
}