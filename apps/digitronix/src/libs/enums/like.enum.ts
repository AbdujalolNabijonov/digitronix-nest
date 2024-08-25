import { registerEnumType } from "@nestjs/graphql";

export enum LikeGroup {
    MEMBER = "MEMBER",
    COMPUTER = "COMPUTER",
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    GRAPHICS = "GRAPHICS",
    KEYBOARD = "KEYBOARD",
    MOUSE = "MOUSE",
    CHAIR = "CHAIR",
    ARTICLE = "ARTICLE",
    COMMENT = "COMMENT"
}

registerEnumType(LikeGroup, { name: "LikeGroup" })