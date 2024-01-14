import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { ProductTypeEnum } from "../enums/ProductType.enum";

export interface OrderType {
    confirmDate?: Date,
    orderStatus: OrderStatusEnum,
    username: string,
    email: string,
    phoneNumber: string,
    orderedProducts: OrderedProductsType[]
}


export interface OrderedProductsType {
    productName: string,
    amount: number
}