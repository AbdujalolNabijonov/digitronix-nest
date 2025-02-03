import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional, Length } from "class-validator";
import { MemberAuthType, MemberType } from "../../enums/member.enum";
import { Direction } from "../../enums/common.enum";
import { avaibleMemberSorts } from "../../types/config";
import { MemberStatus } from "../../types/member";

@InputType()
export class MemberInput {
    @IsNotEmpty()
    @Length(3, 20)
    @Field(() => String)
    memberNick: string

    @IsNotEmpty()
    @Field(() => String)
    memberPhone: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberEmail?: string

    @IsNotEmpty()
    @Length(5, 20)
    @Field(() => String)
    memberPassword: string

    @IsOptional()
    @Field(() => MemberType, { nullable: true })
    memberType?: MemberType

    @IsOptional()
    @Field(() => MemberAuthType, { nullable: true })
    memberAuthType?: MemberAuthType
}

@InputType()
export class LoginInput {
    @IsOptional()
    @Field(() => String, { nullable: true })
    memberNick: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberEmail: string

    @IsNotEmpty()
    @Length(5, 20)
    @Field(() => String)
    memberPassword: string
}

@InputType()
class MISearch {
    @IsOptional()
    @Field(() => MemberType, { nullable: true })
    memberType?: string

    @IsOptional()
    @Field(() => MemberStatus, { nullable: true })
    memberStatus?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string
}

@InputType()
export class MemberInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @IsIn(avaibleMemberSorts)
    @Field(() => String, { nullable: true })
    sort?: string

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: number

    @IsNotEmpty()
    @Field(() => MISearch)
    search: MISearch
}