import { registerEnumType } from "@nestjs/graphql";

export enum ViewGroup {
    MEMBER = "MEMBER",
    COMPUTER = "COMPUTER",
    PERIPHERAL = "PERIPHERAL",
    ARTICLE = "ARTICLE"
}

registerEnumType(ViewGroup, { name: "ViewGroup" })