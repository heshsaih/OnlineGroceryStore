import mongoose, { Error } from "mongoose";
import { ProductTypeEnum } from "../enums/ProductType.enum";
import { ProductType } from "../types/Product";
import { Product, createProduct } from "./ProductRepository"
import { OrderType } from "../types/Order";
import { OrderStatusEnum } from "../enums/OrderStatus.enum";
import { createOrder } from "./OrderRepository";

const products: ProductType[] = [
    {
        name: "Coca-cola 2L",
        description: "Sweet, fizzy drink, popular all over the world",
        unitPrice: 10.90,
        unitWeight: 2.11,
        productType: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Whole grain bread",
        description: "Bread full of different seeds",
        unitPrice: 6.99,
        unitWeight: 0.5,
        productType: ProductTypeEnum.BREAD
    },
    {
        name: "Lettuce",
        description: "Fresh lettuce, perfect for salads of sandwitches",
        unitPrice: 3.50,
        unitWeight: 0.25,
        productType: ProductTypeEnum.VEGETABLES
    },
    {
        name: "Papriker",
        description: "Hungarian dish, primarly consists of meat and paprika",
        unitPrice: 4.78,
        unitWeight: 0.310,
        productType: ProductTypeEnum.MEAT
    },
    {
        name: "Pigeons in tomato sauce",
        description: "Polish traditional dish. Meat and rice wrapped in a cabbage leaf",
        unitPrice: 8.75,
        unitWeight: 0.6,
        productType: ProductTypeEnum.MEAT
    },
    {
        name: "Apples",
        description: "Red, crispy and sweet apples, straight from an orchard",
        unitPrice: 3.0,
        unitWeight: 1.0,
        productType: ProductTypeEnum.FRIUTS
    },
    {
        name: "Sparkling water",
        description: "Just regular water with bubbles",
        unitPrice: 2.0,
        unitWeight: 1.7,
        productType: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Tomato",
        description: "Juicy tomatoes",
        unitPrice: 12.50,
        unitWeight: 1.0,
        productType: ProductTypeEnum.BEVERAGES
    },
    {
        name: "Banana",
        description: "Fresh, yellow bananas",
        unitPrice: 6.99,
        unitWeight: 1.0,
        productType: ProductTypeEnum.FRIUTS
    },
    {
        name: "Toast bread",
        description: "Toast bread, great for toasts",
        unitPrice: 5.84,
        unitWeight: 0.5,
        productType: ProductTypeEnum.BREAD
    }
];

const orders: OrderType[] = [
    {
        approvalDate: new Date(),
        orderStatus: OrderStatusEnum.NOT_APPROVED,
        username: "stachu",
        email: "stachu12@onet.pl",
        phoneNumber: "553220351",
        orderedProducts: [
            {
                productName: "Bananas",
                quantity: 3
            },
            {
                productName: "Apples",
                quantity: 12
            }
        ]
    }
];

export const connectToDatabaseAndInitData = async () => {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/db")
        .catch(error => console.error(error))
        .finally(() => {
            mongoose.connection.db.dropDatabase();
            products.forEach(async (obj) => await createProduct(obj));
            orders.forEach(async (obj) => await createOrder(obj));
        });
};