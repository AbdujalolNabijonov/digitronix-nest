import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ArticleStatus, ArticleCategory } from "../../enums/article.enum";
import { MeLiked } from "../like/like";
import { Member } from "../member/member";

@ObjectType()
export class Article {
    @Field(() => String)
    _id: string

    @Field(() => String)
    memberId: ObjectId

    @Field(() => ArticleCategory)
    articleCategory: ArticleCategory

    @Field(() => ArticleStatus)
    articleStatus: ArticleStatus

    @Field(() => String)
    articleTitle: string

    @Field(() => String)
    articleContext: string

    @Field(() => String)
    articleImage: string

    @Field(() => Number)
    articleLikes: number

    @Field(() => Number)
    articleViews: number

    @Field(() => Number)
    articleComments: number

    @Field(() => [MeLiked])
    meLiked: MeLiked[]

    @Field(() => Member)
    memberData: Member

    @Field(() => Date)
    updatedAt: Date

    @Field(() => Date)
    createdAt: Date
}

@ObjectType()
export class ArticleTotal {
    @Field(() => Number, { nullable: true })
    total?: number
}

@ObjectType()
export class Articles {
    @Field(() => [Article])
    list: Article[]

    @Field(() => [ArticleTotal])
    metaCounter: ArticleTotal[]
}
