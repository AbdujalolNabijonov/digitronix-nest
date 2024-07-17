import { registerEnumType } from "@nestjs/graphql";

export enum LikeGroup {
    MEMBER = "MEMBER",
    COMPUTER = "COMPUTER",
    PERIPHERAL = "PERIPHERAL",
    ARTICLE = "ARTICLE",
    COMMENT = "COMMENT"
}

registerEnumType(LikeGroup, { name: "LikeGroup" })