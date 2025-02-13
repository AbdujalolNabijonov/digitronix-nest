import { Schema } from "mongoose";
import { NoticeGroup } from "../libs/enums/notice.enum";

const NoticeSchema = new Schema({
    noticeTitle: {
        type: String,
        required: true
    },
    noticeContent: {
        type: String,
        required: true
    },
    noticeGroup: {
        type: String,
        enum:NoticeGroup
    },
    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "members"
    },
    noticeTargetId: {
        type: Schema.Types.ObjectId,
        ref: "members"
    }
}, { timestamps: true })

export default NoticeSchema