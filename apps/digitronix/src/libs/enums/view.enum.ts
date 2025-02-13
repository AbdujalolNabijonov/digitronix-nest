import { registerEnumType } from "@nestjs/graphql";

export enum ViewGroup {
    MEMBER = "MEMBER",
    PRODUCT = "'PRODUCT",
    ARTICLE = "ARTICLE",
    NOTICE = "NOTICE"
}

registerEnumType(ViewGroup, { name: "ViewGroup" })