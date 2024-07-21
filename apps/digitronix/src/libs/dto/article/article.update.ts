import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ArticleStatus } from "../../enums/article.enum";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateArticle {
    @IsNotEmpty()
    @Field(() => String)
    _id: ObjectId
    

    @IsOptional()
    @Field(() => ArticleStatus, { nullable: true })
    articleStatus?: ArticleStatus

    @IsOptional()
    @Length(3, 50)
    @Field(() => String, { nullable: true })
    articleTitle?: string;

    @IsOptional()
    @Length(3, 250)
    @Field(() => String, { nullable: true })
    articleContent?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    articleImage?: string;

    deletedAt: Date
}