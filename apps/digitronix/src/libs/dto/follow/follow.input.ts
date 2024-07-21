import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { Direction } from "../../enums/common.enum";

@InputType()
class FSearch {
    @Field(() => String)
    memberId: string
}

@InputType()
export class FollowInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @Field(() => Direction, { nullable: true })
    direction?: Direction

    @IsOptional()
    @IsIn(["createdAt"])
    @Field(() => String, { nullable: true })
    sort?: string

    @IsNotEmpty()
    @Field(() => FSearch)
    search: FSearch
}