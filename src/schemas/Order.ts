import { Schema, Types } from "mongoose";
import { OrderType } from "../types/Order";
import { OrderStateEnum } from "../enums/OrderState.enum";
import { ProductOrderType } from "../types/ProductOrder";

export const orderSchema = new Schema<OrderType>({
    approvalDate: Date,
    orderState: OrderStateEnum,
    username: String,
    email: String,
    phoneNumber: String,
    products: Types.DocumentArray<ProductOrderType>
});