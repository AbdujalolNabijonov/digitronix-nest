import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";
import { ViewGroup } from "../../enums/view.enum";

@InputType()
export class ViewInput {
    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    viewTargetId: ObjectId;

    @IsNotEmpty()
    @Field(() => ViewGroup)
    viewGroup: string
}