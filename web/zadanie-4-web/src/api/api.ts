import { ApiResponseType } from "../types/ApiResponse";
import { OrderType } from "../types/Order";
import { CreateProductType, ProductType } from "../types/Product";
import { apiWithConfig } from "./api.config";

export const api = {
    getAllProducts: (): ApiResponseType<ProductType[]> => {
        return apiWithConfig.get("/products").catch(error => error);
    },

    createProduct: (newProduct: CreateProductType): ApiResponseType<any> => {
        return apiWithConfig.post("/products", newProduct).catch(error => error);
    },

    updateProduct: (newProduct: ProductType): ApiResponseType<any> => {
        return apiWithConfig.put(`/products/${newProduct.id}`, newProduct).catch(error => error);
    },

    getAllOrders: (): ApiResponseType<OrderType[]> => {
        return apiWithConfig.get("/orders").catch(error => error);
    },

    createOrder: (newOrder: OrderType): ApiResponseType<any> => {
        return apiWithConfig.post("/orders", newOrder).catch(error => error);
    },

    updateOrderStatus: (order: OrderType): ApiResponseType<any> => {
        return apiWithConfig.patch(`/orders/${order.id}`, order).catch(error => error);
    }
}