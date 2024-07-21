import { registerEnumType } from "@nestjs/graphql";

export enum ArticleCategory {
    NEWS = "NEWS",
    FREE = "FREE",
    HUMOR = 'HUMOR',
    RECOMMEND = 'RECOMMEND',
}

registerEnumType(ArticleCategory, { name: "ArticleCategory" });

export enum ArticleStatus {
    ACTIVE = "ACTIVE",
    DELETE = "DELETE"
}
registerEnumType(ArticleStatus, { name: "ArticleStatus" })