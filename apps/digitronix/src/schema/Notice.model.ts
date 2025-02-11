import { Schema } from "mongoose";

const NoticeSchema = new Schema({
    noticeContent: {
        type: String,
        required: true
    },
    noticeRead: {
        type: String,
        enum: ["N", "Y"],
        default: "N"
    },
    memberId: {
        type: String,
        required: true,
        ref: "members"
    }
}, { timestamps: true })

export default NoticeSchema