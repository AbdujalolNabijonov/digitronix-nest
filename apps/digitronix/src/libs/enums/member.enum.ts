import { registerEnumType } from "@nestjs/graphql";

export enum MemberType {
    USER = "USER",
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    DELIVER = "DELIVER"
}
registerEnumType(MemberType, { name: "memberType" })

export enum MemberAuthType {
    PHONE = "PHONE",
    TELEGRAM = "TELEGRAM",
    EMAIL = "EMAIL"
}

registerEnumType(MemberAuthType, { name: "memberAuthType" })

export enum LikeGroup {
    MEMBER = "MEMBER",
    PRODUCT = "PRODUCT",
    ARTICLE = "ARTICLE",
    COMMENT = "COMMENT"
}

registerEnumType(LikeGroup, { name: "likeGroup" })