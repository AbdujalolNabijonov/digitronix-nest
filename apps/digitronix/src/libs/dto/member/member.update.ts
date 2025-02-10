import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { MemberStatus } from "../../enums/member";
import { MemberAuthType, MemberType } from "../../enums/member.enum";

@InputType()
export class UpdateMemberInquiry {
    @IsNotEmpty()
    @Length(24)
    @Field(() => String)
    _id: string

    @IsOptional()
    @Length(5, 20)
    @Field(() => String, { nullable: true })
    memberNick?: string

    @IsOptional()
    @Length(5, 20)
    @Field(() => String, { nullable: true })
    memberFullName?: string

    @IsOptional()
    @Length(5, 300)
    @Field(() => String, { nullable: true })
    memberAddress?: string

    @IsOptional()
    @Length(5, 12)
    @Field(() => String, { nullable: true })
    memberPassword?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberDesc?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberImage?: string

    @IsOptional()
    @Field(() => MemberStatus, { nullable: true })
    memberStatus?: string

    @IsOptional()
    @Field(() => MemberType, { nullable: true })
    memberType?: string

    @IsOptional()
    @Field(() => String, { nullable: true })
    memberPhone?: string

    @IsOptional()
    @Field(() => Number, { nullable: true })
    memberLikes?: number

    deletedAt?: Date
}