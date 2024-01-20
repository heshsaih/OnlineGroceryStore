import { ApiResponseType } from "../types/ApiResponse";
import { OrderType } from "../types/Order";
import { CreateProductType, ProductType } from "../types/Product";
import { apiWithConfig } from "./api.config";

export const api = {
    getAllProducts: async (): ApiResponseType<ProductType[]> => {
        return apiWithConfig.get("/products").catch(error => error);
    },

    createProduct: async (newProduct: CreateProductType): ApiResponseType<any> => {
        return apiWithConfig.post("/products", newProduct).catch(error => error);
    },

    updateProduct: async (newProduct: ProductType): ApiResponseType<any> => {
        return apiWithConfig.put(`/products/${newProduct.id}`, newProduct).catch(error => error);
    },

    getAllOrders: async (): ApiResponseType<OrderType[]> => {
        return apiWithConfig.get("/orders").catch(error => error);
    },

    createOrder: async (newOrder: OrderType): ApiResponseType<any> => {
        return apiWithConfig.post("/orders", newOrder).catch(error => error);
    },

    updateOrderStatus: async (order: OrderType): ApiResponseType<any> => {
        return apiWithConfig.patch(`/orders/${order.id}`, order).catch(error => error);
    }
}