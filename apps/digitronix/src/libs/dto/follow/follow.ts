import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "bson";
import { Member } from "../member/member";
import { MeLiked } from "../like/like";

@ObjectType()
class MeFollowed {
    @Field(() => String)
    followingId: ObjectId;

    @Field(() => String)
    followerId: ObjectId;

    @Field(() => Boolean)
    myFollowing: boolean;
}

@ObjectType()
export class Follower {
    @Field(() => String)
    _id:ObjectId

    @Field(() => String)
    followingId: ObjectId

    @Field(() => String)
    followerId: ObjectId

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeFollowed], { nullable: true })
    meFollowed?: MeFollowed[];

    @Field(() => Member, { nullable: true })
    followerData?: Member;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class Following {
    @Field(() => String)
    followingId: ObjectId

    @Field(() => String)
    followerId: ObjectId

    @Field(() => [MeLiked], { nullable: true })
    meLiked?: MeLiked[];

    @Field(() => [MeFollowed], { nullable: true })
    meFollowed?: MeFollowed[];

    @Field(() => Member, { nullable: true })
    followingData?: Member;

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
class TotalFollow {
    @Field(() => Number, { nullable: true })
    total?: number
}

@ObjectType()
export class Followers {
    @Field(() => [Follower])
    list: Follower[]

    @Field(() => [TotalFollow])
    metaCounter: TotalFollow[]
}

@ObjectType()
export class Followings {
    @Field(() => [Following])
    list: Following[]

    @Field(() => [TotalFollow])
    metaCounter: TotalFollow[]
}