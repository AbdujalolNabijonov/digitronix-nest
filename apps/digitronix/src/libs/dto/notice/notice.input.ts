import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Direction } from "../../enums/common.enum";
import { ObjectId } from "mongoose";
import { NoticeGroup } from "../../enums/notice.enum";

@InputType()
class NSearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    memberId?: ObjectId

    @IsOptional()
    @Field(() => String, { nullable: true })
    noticeRead?: string

    @IsOptional()
    @Field(() => NoticeGroup, { nullable: true })
    noticeGroup?: NoticeGroup
}

@InputType()
export class NoticeInquiry {
    @IsOptional()
    @Field(() => Number, { nullable: true })
    page?: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    sort?: string

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction

    @IsNotEmpty()
    @Field(() => NSearch)
    search: NSearch
}

export class NoticeInput {
    @IsNotEmpty()
    @Length(5, 400)
    @Field(() => String)
    noticeTitle: string

    @IsNotEmpty()
    @Length(5, 400)
    @Field(() => String)
    noticeContent: string

    @IsNotEmpty()
    @Field(() => NoticeGroup)
    noticeGroup: NoticeGroup

    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId

    @IsOptional()
    @Field(() => String, { nullable: true })
    noticeTargetId?: ObjectId
}