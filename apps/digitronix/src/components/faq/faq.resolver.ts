import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/enums/member';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { FaqInput, FaqInquiry } from '../../libs/dto/faq/faq.input';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver()
export class FaqResolver {
    constructor(private readonly faqService: FaqService) { }

    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Faq)
    async createFaq(
        @Args("input") input: FaqInput,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Faq> {
        console.log("Mutation: createFaq");
        return await this.faqService.createFaq(memberId, input)
    }


    @UseGuards(WithoutGuards)
    @Query(() => Faqs)
    async getTargetFaqs(
        @Args("input") input: FaqInquiry
    ): Promise<Faqs> {
        console.log(`Query: getTargetFaqs`)
        return await this.faqService.getTargetFaqs(input)
    }

    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Faq)
    async deleteTargetFaq(
        @Args("input") input: String
    ): Promise<Faq> {
        console.log(`Mutation: deleteTargetFaq`)
        const targetId = shapeIntoMongoObjectId(input)
        return await this.faqService.deleteTargetFaq(targetId)
    }
}
