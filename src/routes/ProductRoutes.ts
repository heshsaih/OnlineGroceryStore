import express, { Request, Response } from 'express';
import { createProduct, findAllProducts, findProductById, updateProduct } from '../repositories/ProductRepository';
import { Error } from 'mongoose';
import { StatusCodes } from 'http-status-codes';


const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.send(await findAllProducts());
});

router.get("/:id", async (req: Request, res: Response) => {
    const result = await findProductById(req.params.id);
    if (result instanceof Error.DocumentNotFoundError) {
        res.status(StatusCodes.NOT_FOUND);
    }
    res.send(result);
});

router.post("/", async (req: Request, res: Response) => {
    const result = await createProduct(req.body);
    if (result instanceof Error.ValidationError) {
        res.status(StatusCodes.BAD_REQUEST);
    }
    res.send(result);
});

router.put("/:id", async (req: Request, res: Response) => {
    const result = await updateProduct(req.params.id, req.body);
    if (result instanceof Error.DocumentNotFoundError) {
        res.status(StatusCodes.NOT_FOUND);
    } else if (result instanceof Error.ValidationError) {
        res.status(StatusCodes.BAD_REQUEST);
    }
    res.send(result);
});

export default router;