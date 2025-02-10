import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { FaqCategory } from "../../enums/faq.enum";
import { ObjectId } from "mongoose";
import { Direction } from "../../enums/common.enum";

@InputType()
export class FaqInput {
    memberId: ObjectId
    @IsNotEmpty()
    @Length(5, 300)
    @Field(() => String)
    faqQuestion: string

    @IsNotEmpty()
    @Field(() => String)
    faqAnswer: string

    @IsNotEmpty()
    @Field(() => FaqCategory)
    faqCategory: string
}

@InputType()
class FaqSearch {
    @IsOptional()
    @Field(() => FaqCategory, { nullable: true })
    faqCategory?: FaqCategory

    @IsOptional()
    @Field(() => String, { nullable: true })
    text?: string
}

@InputType()
export class FaqInquiry {
    @IsNotEmpty()
    @Field(() => Number)
    page: number

    @IsNotEmpty()
    @Field(() => Number)
    limit: number

    @IsOptional()
    @Field(() => String, { nullable: true })
    sort?: string

    @IsNotEmpty()
    @Field(() => FaqSearch, { nullable: true })
    search: FaqSearch
}