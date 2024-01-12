import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { ProductTypeEnum } from "../enums/ProductType.enum";

export interface OrderType {
    approvalDate: Date,
    orderStatus: OrderStatusEnum,
    username: string,
    email: string,
    phoneNumber: string,
    orderedProducts: OrderedProductsType[]
}


export interface OrderedProductsType {
    productName: string,
    quantity: number
}