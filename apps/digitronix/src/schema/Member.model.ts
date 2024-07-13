import { Schema } from "mongoose"
import { MemberAuthType, MemberType } from "../libs/enums/member.enum"
import { MemberStatus } from "../libs/types/member"

const MemberSchema = new Schema({
    memberFullName: {
        type: String
    },
    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE
    },
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },
    memberAuthType: {
        type: String,
        enum: MemberAuthType,
        default: MemberAuthType.PHONE
    },
    memberPhone: {
        type: String,
        required: true,
        unique: true,

    },
    memberNick: {
        type: String,
        required: true
    },
    memberPassword: {
        type: String,
        required: true
    },
    memberImage: {
        type: String
    },
    memberAddress: {
        type: String
    },
    memberDesc: {
        type: String
    },
    memberProducts: {
        type: Number,
        default: 0
    },
    memberArticles: {
        type: Number,
        default: 0
    },
    memberFollowers: {
        type: Number,
        default: 0
    },
    memberFollowings: {
        type: Number,
        default: 0
    },
    memberPoints: {
        type: Number,
        default: 0
    },
    memberLikes: {
        type: Number,
        default: 0
    },
    memberViews: {
        type: Number,
        default: 0
    },
    memberComments: {
        type: Number,
        default: 0
    },
    memberRank: {
        type: Number,
        default: 0
    },
    memberWarnings: {
        type: Number,
        default: 0
    },
    memberBlocks: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true, collection: "members" })

export default MemberSchema