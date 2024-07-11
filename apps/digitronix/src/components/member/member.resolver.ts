import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';


@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) { }

    @Mutation(() => String)
    public async signup(
        @Args("input") input: MemberInput
    ): Promise<string> {

        return "salom"
    }
}
