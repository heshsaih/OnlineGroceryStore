import { ProductTypeEnum } from "../enums/ProductType.enum";

export interface ProductType {
    id: string,
    name: string,
    description: string,
    unitPrice: number,
    unitWeight: number,
    productType: ProductTypeEnum
}

export interface CreateProductType {
    name: string,
    description: string,
    unitPrice: number,
    unitWeight: number,
    productType: ProductTypeEnum
}

export interface OrderedProductType {
    productName: string,
    amount: number,
    unitPrice: number
}