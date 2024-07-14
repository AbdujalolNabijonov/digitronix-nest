import { Field, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { ViewGroup } from "../../enums/view.enum";

@ObjectType()
export class View {
    @Field(() => String)
    _id: ObjectId

    @Field(() => ViewGroup)
    viewGroup: ViewGroup

    @Field(() => String)
    viewTargetId: ObjectId

    @Field(() => String)
    memberId: ObjectId

    @Field(() => Date)
    createdAt: Date

    @Field(() => Date)
    updateAt: Date
}