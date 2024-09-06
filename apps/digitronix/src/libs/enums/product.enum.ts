import { registerEnumType } from "@nestjs/graphql";

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETE = "DELETE"
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
    GEFORCE_RTX_4090 = "GEFORCE RTX 4090",
    GEFORCE_RTX_4080 = "GEFORCE RTX 4080",
    GEFORCE_RTX_4070 = "GEFORCE RTX 4070",
    GEFORCE_RTX_4060 = "GEFORCE RTX 4060",
    GEFORCE_RTX_4050 = "GEFORCE RTX 4050",
    GEFORCE_RTX_3070_TI = "GEFORCE RTX 3070 TI",
    GEFORCE_RTX_3070 = "GEFORCE RTX 3070",
    GEFORCE_RTX_3060 = "GEFORCE RTX 3060",
    GEFORCE_RTX_3050_TI = "GEFORCE RTX 3050 TI",
    GEFORCE_RTX_3050 = "GEFORCE RTX 3050",
    GEFORCE_RTX_2080_SUPER = "GEFORCE RTX 2080 SUPER",
    GEFORCE_RTX_2080 = "GEFORCE RTX 2080",
    GEFORCE_RTX_2070_SUPER = "GEFORCE RTX 2070 SUPER",
    GEFORCE_RTX_2070 = "GEFORCE RTX 2070",
    GEFORCE_RTX_2060 = "GEFORCE RTX 2060",
    GEFORCE_RTX_2050 = "GEFORCE RTX 2050",
    GEFORCE_GTX_1660_TI = "GEFORCE GTX 1660 TI",
    GEFORCE_GTX_1650 = "GEFORCE GTX 1650"
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