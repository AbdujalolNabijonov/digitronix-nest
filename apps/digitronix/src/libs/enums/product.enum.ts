import { registerEnumType } from "@nestjs/graphql";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETED = "DELETED"
}
registerEnumType(ProductStatus, { name: "ProductStatus" })

export enum ProductCategory {
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    GRAPHICS = "GRAPHICS",
    KEYBOARD = "KEYBOARD",
    MOUSE = "MOUSE",
    CHAIR = "CHAIR"
}
registerEnumType(ProductCategory, { name: "ProductCategory" })


export enum ProductBrand {
    MSI = "MSI",
    ASUS = "ASUS",
    APPLE = "APPLE",
    RAZER = "RAZER",
    LENOVO = "LENOVO",
    NVIDIA = "NVIDIA"
}
registerEnumType(ProductBrand, { name: "ProductBrand" })



export enum ProductSeries {
    TITAN = "TITAN",
    STEALTH = "STEALTH",
    RAIDER = "RAIDER",
    VECTOR = "VECTOR",
    AEGIS = "AEGIS",
    MACBOOK = "MACBOOK",
    INFINITE = "INFINITE",
    TRIDENT = "TIDENT",
    CODEX = "CODEX",
    META = "META",
    SUPRIM = "SUPRIM",
    GAMING = "GAMING",
    VENTUS = "VENTUS",
    SHADOW = "SHADOW"

}
registerEnumType(ProductSeries, { name: "ProductSeries" })


export enum GraphicsType {
    GeForce_RTX_4090 = "GeForce RTX™ 4090",
    GeForce_RTX_4080 = "GeForce RTX™ 4080",
    GeForce_RTX_4070 = "GeForce RTX™ 4070",
    GeForce_RTX_4060 = "GeForce RTX™ 4060",
    GeForce_RTX_4050 = "GeForce RTX™ 4050",
    GeForce_RTX_3070_TI = "GeForce RTX™ 3070 TI",
    GeForce_RTX_3070 = "GeForce RTX™ 3070",
    GeForce_RTX_3060 = "GeForce RTX™ 3060",
    GeForce_RTX_3050_TI = "GeForce RTX™ 3050 TI",
    GeForce_RTX_3050 = "GeForce RTX™ 3050",
    GeForce_RTX_2080_SUPER = "GeForce RTX™ 2080 SUPER",
    GeForce_RTX_2080 = "GeForce RTX™ 2080",
    GeForce_RTX_2070_SUPER = "GeForce RTX™ 2070 SUPER",
    GeForce_RTX_2070 = "GeForce RTX™ 2070",
    GeForce_RTX_2060 = "GeForce RTX™ 2060",
    GeForce_RTX_2050 = "GeForce RTX™ 2050",
    GeForce_GTX_1660_TI = "GeForce GTX™ 1660 TI",
    GeForce_GTX_1650 = "GeForce GTX™ 1650",
}
registerEnumType(GraphicsType, { name: "GraphicsType" })


export enum Connectivity {
    WIRE = "WIRE",
    WIRELESS = "WIRELESS",
    BLUETOOTH = "BLUETOOTH"
}
registerEnumType(Connectivity, { name: "Connectivity" })

export enum MaterialType {
    FABRIC = "FABRIC",
    LEATHER = "LEATHER",
    MESH = "MESH"
}
registerEnumType(MaterialType, { name: "MaterialType" })

export enum ProductLabel {
    NEW = "NEW",
    HOT = "HOT"
}
registerEnumType(ProductLabel, { name: "ProductLabel" })