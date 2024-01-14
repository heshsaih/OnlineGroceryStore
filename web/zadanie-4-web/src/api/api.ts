import { ApiResponseType } from "../types/ApiResponse";
import { CreateProductType, ProductType } from "../types/Product";
import { apiWithConfig } from "./api.config";

export const api = {
    getAllProducts: (): ApiResponseType<ProductType[]> => {
        return apiWithConfig.get("/products").catch(error => error);
    },

    createProduct: (newProduct: CreateProductType): ApiResponseType<any> => {
        return apiWithConfig.post("/products", newProduct).catch(error => error);
    }
}