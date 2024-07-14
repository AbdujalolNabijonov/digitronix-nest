import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";
import { LikeGroup } from "../../enums/member.enum";

@InputType()
export class LikeInput {
    @IsNotEmpty()
    @Field(() => String)
    likeTargetId: ObjectId

    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId

    @IsNotEmpty()
    @Field(() => LikeGroup)
    likeGroup: string
}
