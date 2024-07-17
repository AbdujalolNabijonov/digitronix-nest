import { registerEnumType } from "@nestjs/graphql";

export enum ViewGroup {
    MEMBER = "MEMBER",
    PRODUCT = "PRODUCT",
    ARTICLE = "ARTICLE"
}

registerEnumType(ViewGroup, { name: "ViewGroup" })