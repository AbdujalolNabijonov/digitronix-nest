import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { FaqCategory } from "../../enums/faq.enum";
import { ArticleTotal } from "../article/article";

@ObjectType()
export class Faq {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    faqQuestion: string

    @Field(() => String)
    faqAnswer: string

    @Field(() => FaqCategory)
    faqCategory: FaqCategory

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class Faqs {
    @Field(() => [Faq])
    list: Faq[]

    @Field(() => [ArticleTotal])
    metaCounter: ArticleTotal[]
}