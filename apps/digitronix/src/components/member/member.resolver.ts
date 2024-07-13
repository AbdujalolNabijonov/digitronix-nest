import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput, MemberInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/types/member';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateMemberInquiry } from '../../libs/dto/member/member.update';


@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => Member)
    public async signup(
        @Args("input") input: MemberInput
    ): Promise<Member | Error> {
        console.log("Mutation: Sigup")
        return await this.memberService.signup(input)
    }

    @Query(returns => Member)
    public async login(
        @Args("input") input: LoginInput
    ): Promise<Member | Error> {
        console.log("Query: Login")
        return await this.memberService.login(input)
    }

    //ADMIN
    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Query(returns => Members)
    public async getAllMembersByAdmin(
        @Args("input") input: MemberInquiry
    ) {
        console.log("Query: getAllMembersByAdmin")
        return await this.memberService.getAllMembersByAdmin(input)
    }

    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(returns => Member)
    public async updateMemberByAdmin(
        @Args("input") input: UpdateMemberInquiry
    ): Promise<Member> {
        console.log("Mutation: updateMemberByAdmin")
        return await this.memberService.updateMemberByAdmin(input)
    }
}
