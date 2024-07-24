import { Schema } from "mongoose";
import { CommentGroup, CommentStatus } from "../libs/enums/comment.enum";

const commentSchema = new Schema({
    commentStatus: {
        type: String,
        enum: CommentStatus,
        default: CommentStatus.ACTIVE,
    },
    commentGroup: {
        type: String,
        enum: CommentGroup,
        required: true,
    },

    commentContent: {
        type: String,
        required: true,
    },

    commentTargetId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    commentRank: {
        type: Number,
        default: 0
    },
    commentLikes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default commentSchema