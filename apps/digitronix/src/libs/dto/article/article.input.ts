import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";
import { ArticleCategory } from "../../enums/article.enum";

@InputType()
export class ArticleInput {
    @IsNotEmpty()
    @Field(() => ArticleCategory)
    articleCategory: ArticleCategory

    @IsNotEmpty()
    @Length(5, 50)
    @Field(() => String)
    articleTitle: string

    @IsNotEmpty()
    @Length(5, 200)
    @Field(() => String)
    articleContext: string

    @IsNotEmpty()
    @Field(() => String)
    articleImage: string
}