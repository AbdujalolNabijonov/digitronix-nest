import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ArticleCategory, ArticleStatus } from "../../enums/article.enum";
import { Direction } from "../../enums/common.enum";
import { avaibleArticleSorts } from "../../config";
import { ObjectId } from "mongoose";

@InputType()
export class ArticleInput {
    @IsNotEmpty()
    @Field(() => ArticleCategory)
    articleCategory: ArticleCategory

    @IsNotEmpty()
    @Field(() => String)
    articleTitle: string

    @IsNotEmpty()
    @Length(5, 500)
    @Field(() => String)
    articleContext: string

    @IsOptional()
    @Field(() => String, {nullable:true})
    articleImage?: string
}
@InputType()
class ASearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string

    @IsOptional()
    @Field(() => ArticleCategory, { nullable: true })
    articleCategory?: ArticleCategory

    @IsOptional()
    @Field(() => ArticleStatus, { nullable: true })
    articleStatus?: ArticleStatus

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberId?: ObjectId
}

@InputType()
export class ArticlesInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: number

    @IsOptional()
    @IsIn(avaibleArticleSorts)
    @Field(() => String, { nullable: true })
    sort?: string

    @Field(() => ASearch)
    search: ASearch
}