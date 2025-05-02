import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OptRequest {
    @Field(() => String)
    message: string
}