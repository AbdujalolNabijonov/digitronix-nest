import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Follower, Following } from '../../libs/dto/follow/follow';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/common';

@Injectable()
export class FollowService {
    constructor(
        @InjectModel("Follow") private readonly followModel: Model<Follower | Following>,
        private readonly memberService: MemberService
    ) { }

    public async followMember(
        targetMemberId: ObjectId,
        memberId: ObjectId
    ): Promise<Follower> {
        if (targetMemberId === memberId) throw new InternalServerErrorException(Message.SELF_SUBSCRIPTION_DENIED)

        const existance = await this.memberService.checkMember(targetMemberId);
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

        let result = await this.checkExistance(targetMemberId, memberId);
        if (!result) {
            const followInput = {
                followingId: targetMemberId,
                followerId: memberId
            }
            result = await this.followModel.create(followInput);
            if (!result) throw new BadRequestException(Message.CREATE_FAILED)
            else {
                await this.memberService.memberStatsEdit(memberId, 1, "memberFollowings")
                await this.memberService.memberStatsEdit(targetMemberId, 1, "memberFollowers")
                result.followerData = existance
                return result
            }
        } else {
            throw new BadRequestException(Message.ALREADY_SUBSCRIBED)
        }

    }

    public async unfollowMember(
        targetMemberId: ObjectId,
        memberId: ObjectId
    ): Promise<Follower> {
        const existance = await this.memberService.checkMember(targetMemberId)
        if (!existance) throw new InternalServerErrorException(Message.NO_DATA_FOUND)

        const subscribedBefore = await this.checkExistance(targetMemberId, memberId);
        if (subscribedBefore) {
            const followInput = {
                followingId: targetMemberId,
                followerId: memberId
            }
            const result = await this.followModel.findOneAndDelete(followInput);
            if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

            await this.memberService.memberStatsEdit(targetMemberId, -1, "memberFollowers")
            await this.memberService.memberStatsEdit(memberId, -1, "memberFollowings")
            
            return result
        } else {
            throw new BadRequestException(Message.SOMETHING_WENT_WRONG)
        }
    }
    // getFollowingMembers
    // getFollowerMembers

    public async checkExistance(targetMemberId: ObjectId, memberId: ObjectId): Promise<Follower | null> {
        const search = {
            followingId: targetMemberId,
            followerId: memberId
        }
        const result = await this.followModel.findOne(search).exec()
        if (result) {
            return result
        } else {
            return null
        }
    }

}

