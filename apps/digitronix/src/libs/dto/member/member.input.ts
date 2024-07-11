import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";
import { MemberAuthType, MemberType } from "../../enums/member.enum";

@InputType()
export class MemberInput {
    @IsNotEmpty()
    @Length(4, 15)
    @Field(() => String)
    memberNick: string

    @IsNotEmpty()
    @Field(() => String)
    memberPhone: string

    @IsOptional()
    @Field(() => MemberType, { nullable: true })
    memberType?: MemberType

    @IsOptional()
    @Field(() => MemberAuthType, { nullable: true })
    memberAuthType?: MemberAuthType
}