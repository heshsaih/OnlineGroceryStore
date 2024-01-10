import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});