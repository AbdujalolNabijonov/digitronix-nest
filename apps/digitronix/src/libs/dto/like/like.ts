import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose"
import { LikeGroup } from "../../enums/like.enum";

@ObjectType()
export class Like {
    @Field(() => String)
    _id: ObjectId

    @Field(() => String)
    likeTargetId: ObjectId

    @Field(() => String)
    memberId: ObjectId

    @Field(() => LikeGroup)
    likeGroup?: string

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updatedAt: Date
}

@ObjectType()
export class MeLiked {
    @Field(() => String)
    memberId: ObjectId;

    @Field(() => String)
    likeTargetId: ObjectId;

    @Field(() => Boolean)
    myFavorite: boolean;
}