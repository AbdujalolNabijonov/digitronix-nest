import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuthType, MemberType } from "../../enums/member.enum";

@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String, { nullable: true })
    memberFullName?: string

    @Field(() => MemberType)
    memberType: MemberType

    @Field(() => MemberAuthType)
    memberAuthType: MemberAuthType

    @Field(() => String)
    memberPhone: string

    @Field(() => String)
    memberNick: string

    @Field(() => String)
    memberPassword: string

    @Field(() => String, { nullable: true })
    memberImage?: string

    @Field(() => String, { nullable: true })
    memberAddress?: string

    @Field(() => String, { nullable: true })
    memberDesc?: string

    @Field(() => Number)
    memberProducts: number

    @Field(() => Number)
    memberArticles: number

    @Field(() => Number)
    memberFollowers: number

    @Field(() => Number)
    memberFollowings: number

    @Field(() => Number)
    memberPoints: number

    @Field(() => Number)
    memberLikes: number

    @Field(() => Number)
    memberViews: number

    @Field(() => Number)
    memberComments: number

    @Field(() => Number)
    memberRank: number

    @Field(() => Number)
    memberWarnings: number

    @Field(() => Number)
    memberBlocks: number

    @Field(() => Date, { nullable: true })
    deletedAt?: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}