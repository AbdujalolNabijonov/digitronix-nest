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
export class Notices {
    @Field(() => [Notice])
    list: Notice[]

    @Field(() => [ArticleTotal])
    metaCounter: ArticleTotal[]
}


@ObjectType()
export class DeleteNotice {
    @Field(() => Boolean)
    acknowledged: boolean

    @Field(() => Number)
    deletedCount: number
}