import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class OTPModel {
    @Field(() => String)
    email: string

    @Field(() => String)
    otp: string
}

