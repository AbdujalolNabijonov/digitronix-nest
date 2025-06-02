import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/auth.roles';
import { MemberGroup } from '../../libs/enums/member';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeleteNotice, Notice, Notices } from '../../libs/dto/notice/notice';
import { NoticeService } from './notice.service';
import { WithoutGuards } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { NoticeInquiry, ReadAll, ReadNotices } from '../../libs/dto/notice/notice.input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';

@Resolver()
export class NoticeResolver {

    constructor(private readonly noticeService: NoticeService) { }

    @UseGuards(WithoutGuards)
    @Query(() => Notices)
    async getAllNotices(
        @Args("input") input: NoticeInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Notices> {
        console.log("Query: getAllNotices")
        return await this.noticeService.getAllNotices(memberId, input)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => DeleteNotice)
    async deleteNotices(
        @AuthMember("_id") memberId: ObjectId
    ): Promise<DeleteNotice> {
        console.log("Mutation: deleteTargetNotice")
        return await this.noticeService.deleteNotices(memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ReadNotices)
    async readAllNotices(
        @AuthMember("_id") memberId: ObjectId,
        @Args("input") input: ReadAll
    ): Promise<ReadNotices> {
        console.log("Mutation: readAll")
        return await this.noticeService.readAllNotices(memberId, input)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Notice)
    public async readTargetNotice(
        @Args("input") input: string,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Notice> {
        console.log("Mutation: readTargetNotice");
        return await this.noticeService.readTargetNotice(memberId, input)
    }

    //Admin
    @Roles(MemberGroup.ADMIN)
    @UseGuards(AuthGuard)
    @Mutation(() => Notice)
    async deleteTargetNoticeByAdmin(
        @Args("input") input: String
    ): Promise<{}> {
        console.log("Mutation: deleteTargetNoticeByAdmin")
        const targetId = shapeIntoMongoObjectId(input)
        return await this.noticeService.deleteTargetNotice(targetId)
    }
}
