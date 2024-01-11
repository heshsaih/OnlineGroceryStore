import { model } from "mongoose";
import { orderSchema } from "../schemas/Order";
import { OrderType } from "../types/Order";

const Order = model<OrderType>("Order", orderSchema);

