import express, { Request, Response } from 'express';
import { createOrder, findAllOrders, findOrderById, updateOrderStatus } from '../repositories/OrderRepository';
import { Error, MongooseError } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.send(await findAllOrders());
});

router.get("/:id", async (req: Request, res: Response) => {
    const result = await findOrderById(req.params.id);
    if (result instanceof Error.DocumentNotFoundError) {
        res.status(StatusCodes.NOT_FOUND);
    }
    res.send(result);
});

router.post("/", async (req: Request, res: Response) => {
    const result = await createOrder(req.body);
    if (result instanceof Error.ValidationError) {
        res.status(StatusCodes.BAD_REQUEST);
    }
    res.send(result);
});

router.patch("/:id", async (req: Request, res: Response) => {
    const result = await updateOrderStatus(req.params.id, req.body.orderStatus);
    if (result instanceof Error.DocumentNotFoundError) {
        res.status(StatusCodes.NOT_FOUND);
    } else if (result instanceof MongooseError) {
        res.status(StatusCodes.BAD_REQUEST);
    }
    res.send(result);
});

export default router;