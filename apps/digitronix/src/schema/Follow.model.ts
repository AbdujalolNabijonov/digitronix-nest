import { Schema } from "mongoose"

const followSchema = new Schema({
    followingId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    followerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
}, { timestamps: true })

followSchema.index({ followingId: 1, followerId: 1 }, { unique: true });

export default followSchema