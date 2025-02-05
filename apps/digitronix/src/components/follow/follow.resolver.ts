import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/types/config';
import { WithoutGuards } from '../auth/guards/without.guard';
import { FollowInquiry } from '../../libs/dto/follow/follow.input';
import { Follower, Followers, Followings } from '../../libs/dto/follow/follow';

@Resolver()
export class FollowResolver {
    constructor(
        private readonly followService: FollowService
    ) { }

    @UseGuards(AuthGuard)
    @Mutation(() => Follower)
    public async followMember(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Follower> {
        console.log("Mutation: followMember");
        const targetMemberId = shapeIntoMongoObjectId(input)
        return await this.followService.followMember(targetMemberId, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Follower)
    public async unfollowMember(
        @Args("input") input: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Follower> {
        console.log("Mutation: unfollowMember");
        const targetMemberId = shapeIntoMongoObjectId(input);
        return await this.followService.unfollowMember(targetMemberId, memberId)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Followings)
    public async getFollowingMembers(
        @Args("input") input: FollowInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Followings> {
        console.log("Query: getFollowingMembers")
        const targetMemberId = shapeIntoMongoObjectId(input.search.memberId)
        return await this.followService.getFollowingMembers(input, targetMemberId, memberId)
    }

    @UseGuards(WithoutGuards)
    @Query(() => Followers)
    public async getFollowerMembers(
        @Args("input") input: FollowInquiry,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Followers> {
        console.log("Query: getFollowerMembers")
        const targetMemberId = shapeIntoMongoObjectId(input.search.memberId)
        return await this.followService.getFollowerMembers(input, targetMemberId, memberId)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Follower)
    public async deleteFollower(
        @Args("input") followerId: String,
        @AuthMember("_id") memberId: ObjectId
    ): Promise<Follower> {
        console.log("Mutation: deleteFollower");
        const targetFollowerId = shapeIntoMongoObjectId(followerId);
        return await this.followService.deleteFollower(memberId, targetFollowerId);
    }

}
