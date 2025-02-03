import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";
import { CommentGroup } from "../../enums/comment.enum";
import { ObjectId } from "mongoose";

@InputType()
export class CommentInput {
    @IsNotEmpty()
    @Field(() => CommentGroup)
    commentGroup: CommentGroup

    @IsNotEmpty()
    @Length(3, 500)
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

@InputType()
class CSearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    commentTargetId: ObjectId
}


@InputType()
export class CommentInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    sort?: string

    @IsNotEmpty()
    @Field(() => CSearch)
    search: CSearch

}