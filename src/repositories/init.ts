import mongoose from "mongoose";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { ProductType } from "../types/Product";
import { Product } from "./ProductRepository"

const products: ProductType[] = [
    {
        name: "Coca-cola 2L",
        description: "Sweet, fizzy drink, popular all over the world",
        unitPrice: 10.90,
        unitWeight: 2.11,
        type: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Whole grain bread",
        description: "Bread full of different seeds",
        unitPrice: 6.99,
        unitWeight: 0.5,
        type: ProductTypeEnum.BREAD
    },
    {
        name: "Lettuce",
        description: "Fresh lettuce, perfect for salads of sandwitches",
        unitPrice: 3.50,
        unitWeight: 0.25,
        type: ProductTypeEnum.VEGETABLES
    },
    {
        name: "Papriker",
        description: "Hungarian dish, primarly consists of meat and paprika",
        unitPrice: 4.78,
        unitWeight: 0.310,
        type: ProductTypeEnum.MEAT
    },
    {
        name: "Pigeons in tomato sauce",
        description: "Polish traditional dish. Meat and rice wrapped in a cabbage leaf",
        unitPrice: 8.75,
        unitWeight: 0.6,
        type: ProductTypeEnum.MEAT
    },
    {
        name: "Apples",
        description: "Red, crispy and sweet apples, straight from an orchard",
        unitPrice: 3.0,
        unitWeight: 1.0,
        type: ProductTypeEnum.FRIUTS
    },
    {
        name: "Sparkling water",
        description: "Just regular water with bubbles",
        unitPrice: 2.0,
        unitWeight: 1.7,
        type: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Tomato",
        description: "Juicy tomatoes",
        unitPrice: 12.50,
        unitWeight: 1.0,
        type: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Banana",
        description: "Fresh, yellow bananas",
        unitPrice: 6.99,
        unitWeight: 1.0,
        type: ProductTypeEnum.FRIUTS
    },
    {
        name: "Toast bread",
        description: "Toast bread, great for toasts",
        unitPrice: 5.84,
        unitWeight: 0.5,
        type: ProductTypeEnum.BREAD
    }
];

export const connectToDatabaseAndInitData = async () => {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/db")
        .catch(error => console.error(error))
        .finally(() => {
            mongoose.connection.db.dropDatabase();
            products.forEach(async (obj) => {
                const product = new Product(obj);
                await product.save();
            });
        });
};