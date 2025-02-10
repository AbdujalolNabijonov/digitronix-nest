import { Schema } from "mongoose";
import { FaqCategory } from "../libs/enums/faq.enum";

const faqSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    faqQuestion: {
        type: String,
        required: true
    },
    faqAnswer: {
        type: String,
        required: true
    },
    faqCategory: {
        type: String,
        enum: FaqCategory,
        required: true
    }
}, { timestamps: true })

export default faqSchema