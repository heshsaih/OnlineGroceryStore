import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import productRoutes from "./routes/ProductRoutes";
import orderRoutes from "./routes/OrderRoutes";
import { connectToDatabaseAndInitData } from './repositories/init';
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

app.listen(port, () => {
    connectToDatabaseAndInitData();
    console.log(`Running on port ${port}`);
});