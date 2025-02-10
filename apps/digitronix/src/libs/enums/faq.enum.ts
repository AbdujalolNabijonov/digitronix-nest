import { registerEnumType } from "@nestjs/graphql";

export enum FaqCategory{
    GENERAL = 'GENERAL',
    SERVICES = 'SERVICES',
    BUY = "BUY",
    COMMUNITY = "COMMUNITY",
    CONTACT = "CONTACT"
}

registerEnumType(FaqCategory,{name:"FaqCategory"})