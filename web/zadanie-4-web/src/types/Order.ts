import { OrderStatusEnum } from "../enums/OrderStatus.enum"
import { OrderedProductType } from "./Product"

export interface OrderType {
    id?: string,
    confirmDate: Date,
    orderStatus: OrderStatusEnum,
    username: string,
    email: string,
    phoneNumber: string,
    orderedProducts: OrderedProductType[]
}