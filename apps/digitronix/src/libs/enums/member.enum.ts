import { registerEnumType } from "@nestjs/graphql";

export enum MemberType {
    USER = "USER",
    ADMIN = "ADMIN",
    RETAILER = "RETAILER",
    DELIVER = "DELIVER"
}
registerEnumType(MemberType, { name: "MemberType" })

export enum MemberAuthType {
    PHONE = "PHONE",
    TELEGRAM = "TELEGRAM",
    EMAIL = "EMAIL"
}

registerEnumType(MemberAuthType, { name: "MemberAuthType" })