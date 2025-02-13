import { registerEnumType } from "@nestjs/graphql";

export enum NoticeGroup{
    ADMIN = "ADMIN",
    ARTICLE = "ARTICLE",
    MEMBER = "MEMBER",
    PRODUCT = "PRODUCT",
    FOLLOW = "FOLLOW"
}

registerEnumType(NoticeGroup, {name:"NoticeGroup"})