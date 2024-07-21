import { Schema } from "mongoose";
import { ArticleStatus, ArticleCategory } from "../libs/enums/article.enum";

const articleSchema = new Schema({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    articleCategory: {
        type: String,
        enum: ArticleCategory,
        required: true
    },
    articleStatus: {
        type: String,
        enum: ArticleStatus,
        default: ArticleStatus.ACTIVE
    },
    articleTitle: {
        type: String,
        required: true
    },
    articleContext: {
        type: String,
        required: true
    },
    articleImage: {
        type: String,
    },
    articleLikes: {
        type: Number,
        default: 0
    },
    articleViews: {
        type: Number,
        default: 0
    },
    articleComments: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true })

export default articleSchema;