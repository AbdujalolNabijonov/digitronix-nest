import { Schema } from "mongoose";
import { LikeGroup } from "../libs/enums/like.enum";

const LikeSchema = new Schema({
    likeTargetId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    likeGroup: {
        type: String,
        enum: LikeGroup
    }
}, { timestamps: true })

LikeSchema.index({ memberId: 1, likeTargetId: 1 }, { unique: true });

export default LikeSchema