import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ArticleTotal } from "../article/article";

@ObjectType()
export class Notice {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    noticeContent: string

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class Notices {
    @Field(() => [Notice])
    list: Notice[]

    @Field(() => [ArticleTotal])
    metaCounter: ArticleTotal[]
}