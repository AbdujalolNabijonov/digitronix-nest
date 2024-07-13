import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';


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
}
