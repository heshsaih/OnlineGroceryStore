import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import productRoutes from "./routes/ProductRoutes";
import orderRoutes from "./routes/OrderRoutes";
import { initData } from './repositories/init';
import { connectToMongoDB } from './repositories/connection';
import bodyParser from 'body-parser';
import cors from 'cors';

configDotenv();

const app = express();
const port = process.env.PORT;
const corsSettings = {
    origin: "http://localhost:5173"
};


app.use(cors(corsSettings));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(port, async () => {
    await connectToMongoDB().then(async () => await initData());
    console.log(`Running on port ${port}`);
});