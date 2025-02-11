import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/enums/member';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeService } from './notice.service';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { NoticeInquiry } from '../../libs/dto/notice/notice.input';

@Resolver()
export class NoticeResolver {

    constructor(private readonly noticeService: NoticeService) { }

    @UseGuards(WithoutGuards)
    @Query(() => Notices)
    async getAllNotices(
        @Args("input") input:NoticeInquiry
    ): Promise<Notices> {
        console.log("Query: getAllNotices")
        return await this.noticeService.getAllNotices(input)
    }

    @Roles(MemberGroup.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Notice)
    async deleteTargetNotice(
        @Args("input") input: String
    ): Promise<Notice> {
        console.log("Mutation: deleteTargetNotice")
        const targetId = shapeIntoMongoObjectId(input)
        return await this.noticeService.deleteTargetNotice(targetId)
    }
}
