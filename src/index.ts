import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import productRoutes from "./routes/ProductRoutes";
import orderRoutes from "./routes/OrderRoutes";
import { connectToDatabaseAndInitData } from './repositories/init';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
    connectToDatabaseAndInitData();
    console.log(`Running on port ${port}`);
});