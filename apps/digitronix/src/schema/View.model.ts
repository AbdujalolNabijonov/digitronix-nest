import { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const ViewSchema = new Schema({
    viewTargetId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    viewGroup: {
        type: String,
        enum: ViewGroup,
        required: true
    }
})

ViewSchema.index({ viewTargetId: 1, memberId: 1 }, { unique: true })

export default ViewSchema