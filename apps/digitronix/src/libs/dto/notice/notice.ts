import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ArticleTotal } from "../article/article";
import { Member } from "../member/member";
import { NoticeGroup } from "../../enums/notice.enum";

@ObjectType()
export class Notice {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    noticeTitle: string

    @Field(() => String)
    noticeContent: string

    @Field(() => NoticeGroup)
    noticeGroup: NoticeGroup

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Member, { nullable: true })
    memberData?: Member

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}
@ObjectType()
export class CategoryCount {
    @Field(() => Number)
    all: number
    @Field(() => Number)
    product: number
    @Field(() => Number)
    article: number
    @Field(() => Number)
    follow: number
    @Field(() => Number)
    member: number
}

@ObjectType()
export class Notices {
    @Field(() => [Notice])
    list: Notice[]

    @Field(() => [ArticleTotal])
    metaCounter: ArticleTotal[]

    @Field(() => CategoryCount)
    categoryCount: CategoryCount
}


@ObjectType()
export class DeleteNotice {
    @Field(() => Boolean)
    acknowledged: boolean

    @Field(() => Number)
    deletedCount: number
}