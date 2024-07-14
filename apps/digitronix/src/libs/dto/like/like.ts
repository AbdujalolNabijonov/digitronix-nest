import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "bson"
import { LikeGroup } from "../../enums/member.enum";

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
}