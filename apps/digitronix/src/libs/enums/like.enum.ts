import { registerEnumType } from "@nestjs/graphql";

export enum LikeGroup {
    MEMBER = "MEMBER",
    PRODUCT = "PRODUCT",
    ARTICLE = "ARTICLE",
    COMMENT = "COMMENT"
}

registerEnumType(LikeGroup, { name: "likeGroup" })