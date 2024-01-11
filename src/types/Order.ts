import { OrderStateEnum } from "../enums/OrderState.enum";
import { ProductOrderType } from "./ProductOrder";

export interface OrderType {
    approvalDate: Date,
    orderState: OrderStateEnum,
    username: string,
    email: string,
    phoneNumber: string,
    products: ProductOrderType[]
}