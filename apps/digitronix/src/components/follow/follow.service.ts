import { BadRequestException, Injectable, InternalServerErrorException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Follower, Followers, Following, Followings } from '../../libs/dto/follow/follow';
import { MemberService } from '../member/member.service';
import { Message } from '../../libs/common';
import { FollowInquiry } from '../../libs/dto/follow/follow.input';
import { Direction } from '../../libs/enums/common.enum';
import { lookUpAuthMemberFollowed, lookupAuthMemberLiked, lookupFollowerMemberData, lookupFollowingMemberData } from '../../libs/types/config';
import { T } from '../../libs/types/general';

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
        if (String(targetMemberId) === String(memberId)) throw new InternalServerErrorException(Message.SELF_SUBSCRIPTION_DENIED)

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



    public async getFollowingMembers(input: FollowInquiry, targetMemberId: ObjectId, memberId: ObjectId): Promise<Followings> {
        const { page, limit, direction, sort } = input;

        const sorting = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }
        const result = await this.followModel.aggregate([
            { $match: { followerId: targetMemberId } },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupFollowingMemberData,
                        lookupAuthMemberLiked(memberId, "$followingId"),
                        lookUpAuthMemberFollowed({ followerId: memberId, followingId: "$followingId" }),
                        { $unwind: "$followingData" }

                    ],
                    metaCounter: [
                        { $count: "total" }
                    ]
                }
            }
        ]).exec()
        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async getFollowerMembers(input: FollowInquiry, targetMemberId: ObjectId, memberId: ObjectId): Promise<Followers> {
        const { page, limit, direction, sort } = input

        const sorting = {
            [sort ?? "createdAt"]: direction ?? Direction.DESC
        }
        const result = await this.followModel.aggregate([
            { $match: { followingId: targetMemberId } },
            { $sort: sorting },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupFollowerMemberData,
                        lookupAuthMemberLiked(memberId, "$followerId"),
                        lookUpAuthMemberFollowed({ followerId: memberId, followingId: "$followerId" }),
                        { $unwind: "$followerData" }
                    ],
                    metaCounter: [
                        { $count: "total" }
                    ]
                }
            }
        ]).exec()
        if (!result[0]) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
        return result[0]
    }

    public async deleteFollower(memberId: ObjectId, followerId: ObjectId): Promise<Follower> {
        const match: T = {
            followingId: memberId,
            followerId: followerId
        }
        const result = await this.followModel.findOneAndDelete(match).exec();
        if (result) {
            await this.memberService.memberStatsEdit(followerId, -1, "memberFollowings")
            await this.memberService.memberStatsEdit(memberId, -1, "memberFollowers")
        }else{
            throw new BadRequestException(Message.NO_DATA_FOUND)
        }
        return result
    }
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

