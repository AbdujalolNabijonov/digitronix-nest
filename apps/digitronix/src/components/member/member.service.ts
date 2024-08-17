import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Member, Members } from '../../libs/dto/member/member';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { LoginInput, MemberInput, MemberInquiry } from '../../libs/dto/member/member.input';
import { AuthService } from '../auth/auth.service';
import { Message } from '../../libs/common';
import { T } from '../../libs/types/general';
import { Direction } from '../../libs/enums/common.enum';
import { UpdateMemberInquiry } from '../../libs/dto/member/member.update';
import { lookupAuthMemberLiked, shapeIntoMongoObjectId } from '../../libs/types/config';
import { MemberStatus } from '../../libs/types/member';
import { MemberType } from '../../libs/enums/member.enum';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';
import { ViewService } from '../view/view.service';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewInput } from '../../libs/dto/view/view.input';

@Injectable()
export class MemberService {
    constructor(
        @InjectModel("Member") private readonly memberModel: Model<Member>,
        private readonly authService: AuthService,
        private readonly likeService: LikeService,
        private readonly viewService: ViewService
    ) { };
    s
    public async signup(input: MemberInput): Promise<Member | Error> {
        input["memberPassword"] = await this.authService.hashPassword(input.memberPassword);
        try {
            const member = await this.memberModel.create(input);
            member.accessToken = await this.authService.jwtGenerator(member);
            return member
        } catch (err: any) {
            console.log("Error, Service.model:", err.message);
            throw new Error(Message.USED_MEMBER_OR_PHONE)
        }
    }

    public async login(input: LoginInput): Promise<Member | Error> {
        try {
            let member: Member;
            if (input.memberEmail) { member = await this.memberModel.findOne({ memberEmail: input.memberEmail, memberStatus: MemberStatus.ACTIVE }).exec() }
            else if (input.memberNick) { member = await this.memberModel.findOne({ memberNick: input.memberNick, memberStatus: MemberStatus.ACTIVE }).exec() }

            if (!member) { throw new Error(Message.NO_DATA_FOUND); }
            const isCorrectPassword = await this.authService.comparePassword(input.memberPassword, member.memberPassword);
            if (!isCorrectPassword) { throw new Error(Message.WRONG_PASSWORD) }
            else if (member.memberStatus === MemberStatus.BLOCK) {
                throw new Error("You have been blocked!")
            } else {
                member.accessToken = await this.authService.jwtGenerator(member);
                return member
            }
        } catch (err: any) {
            console.log("Error: Service.model:", err.message);
            return err
        }
    }

    public async getMember(target: ObjectId, memberId: ObjectId): Promise<Member> {
        const search = {
            _id: target,
            memberStatus: { $in: [MemberStatus.ACTIVE, MemberStatus.BLOCK] }
        }

        const member = await this.memberModel.findOne(search).exec();
        if (memberId) {
            //like
            const inputLike: LikeInput = {
                likeTargetId: target,
                likeGroup: LikeGroup.MEMBER,
                memberId
            }
            const likeExist = await this.likeService.checkExistence(inputLike);
            if (likeExist) {
                member.meLiked = [{
                    likeTargetId: likeExist.likeTargetId,
                    memberId,
                    myFavorite: true
                }]
            }
            //view
            const viewInput: ViewInput = {
                viewTargetId: target,
                memberId,
                viewGroup: ViewGroup.MEMBER
            }
            const recordedView = await this.viewService.recordView(viewInput)
            if (recordedView) {
                await this.memberModel.findOneAndUpdate({ _id: target }, { $inc: { memberViews: 1 } }).exec()
                member.memberViews++
            }
            //follow
        }
        if (!member) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return member
    }

    public async updateMember(input: UpdateMemberInquiry): Promise<Member> {
        const member = await this.memberModel.findOneAndUpdate(
            {
                _id: input._id,
                memberStatus: MemberStatus.ACTIVE
            },
            input,
            { returnDocument: "after" }
        ).exec();
        if (!member) throw new InternalServerErrorException(Message.UPDATE_FAILED);
        member.accessToken = await this.authService.jwtGenerator(member);
        return member
    }

    public async getMembers(input: MemberInquiry, memberId: ObjectId): Promise<Members> {
        const { memberType, text } = input.search;
        const { page, limit, direction, sort } = input
        const match: T = {}
        match.memberStatus = MemberStatus.ACTIVE;
        if (memberType) match.memberType = memberType;
        if (text) match.memberNick = { $regex: new RegExp(text, "i") }

        const sortFilter: T = { [sort ?? "createdAt"]: direction ?? Direction.DESC }
        const members = await this.memberModel.aggregate([
            { $match: match },
            { $sort: sortFilter },
            {
                $facet: {
                    list: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                        lookupAuthMemberLiked(memberId)
                    ],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        if (!members.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return members[0]
    }

    public async likeMember(likeTargetId: ObjectId, memberId: ObjectId): Promise<Member> {
        const target = await this.memberModel.findOne({ _id: likeTargetId, memberStatus: MemberStatus.ACTIVE }).exec()
        if (!target) throw new BadRequestException(Message.NO_DATA_FOUND)

        const inputLike: LikeInput = {
            likeTargetId,
            memberId,
            likeGroup: LikeGroup.MEMBER
        }
        const modifier: number = await this.likeService.likeTargetToggle(inputLike)
        const likedMember = await this.memberStatsEdit(likeTargetId, modifier, "memberLikes")

        if (!likedMember) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
        return likedMember
    }

    //ADMIN
    public async getAllMembersByAdmin(input: MemberInquiry): Promise<Members> {
        const { memberStatus, memberType, text } = input?.search;
        const { page, limit, direction, sort } = input

        const match: T = {};
        if (memberStatus) match.memberStatus = memberStatus;
        if (memberType) match.memberType = memberType;
        if (text) match.memberNick = { $regex: new RegExp(text, "i") };

        const sortFilter: T = { [sort ?? "createdAt"]: direction ?? Direction.DESC }

        const list = await this.memberModel.aggregate([
            { $match: match },
            { $sort: sortFilter },
            {
                $facet: {
                    list: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                    metaCounter: [{ $count: "total" }]
                }
            }
        ]).exec()
        if (!list.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND)
        return list[0]
    }

    public async updateMemberByAdmin(input: UpdateMemberInquiry): Promise<Member> {
        input._id = shapeIntoMongoObjectId(input._id)
        const result: Member = await this.memberModel.findOneAndUpdate({ _id: input._id }, input, { returnDocument: "after" }).exec();
        if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED)
        return result
    }

    public async checkMember(memberId: ObjectId): Promise<Member> {
        return await this.memberModel.findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE }).lean().exec();
    }
    public async memberStatsEdit(memberId: ObjectId, modifier: number, dataset: string): Promise<Member> {
        const member = await this.memberModel
            .findOneAndUpdate(
                { _id: memberId },
                { $inc: { [dataset]: modifier } },
                { returnDocument: "after" })
            .exec()
        return member
    }
}
