import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Direction } from "../../enums/common.enum";
import { ObjectId } from "mongoose";

@InputType()
class NSearch {
    @IsOptional()
    @Field(() => String, { nullable: true })
    noticeRead?: string
}

@InputType()
export class NoticeInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

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
    noticeContent: string

    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId
}