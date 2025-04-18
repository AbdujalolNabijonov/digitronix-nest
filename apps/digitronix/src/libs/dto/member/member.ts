import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { MemberAuthType, MemberType } from "../../enums/member.enum";
import { IsOptional } from "class-validator";
import { MemberStatus } from "../../enums/member";
import { MeLiked } from "../like/like";
import { MeFollowed } from "../follow/follow";

@ObjectType()
export class Member {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String, { nullable: true })
    memberFullName?: string

    @Field(() => String, { nullable: true })
    memberEmail?: string

    @Field(() => MemberStatus)
    memberStatus: string

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

    @IsOptional()
    @Field(() => String, { nullable: true })
    accessToken?: string


    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[]

    @Field(() => [MeFollowed], { nullable: true })
    meFollowed?: MeFollowed[]

    @Field(() => Date, { nullable: true })
    deletedAt?: Date

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
class TotalCount {
    @Field(() => Number, {nullable:true})
    total?: number
}

@ObjectType()
export class Members {
    @Field(() => [Member])
    list: Member[]

    @Field(() => [TotalCount])
    metaCounter: TotalCount[]
}