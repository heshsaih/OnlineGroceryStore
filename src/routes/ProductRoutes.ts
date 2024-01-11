import express, { Request, Response } from 'express';
import { findAllProducts, findProductById } from '../repositories/ProductRepository';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    res.send(await findAllProducts());
});

router.get("/:id", async (req: Request, res: Response) => {
    res.send(await findProductById(req.params.id));
});

router.post("/", (req: Request, res: Response) => {

});

router.put("/:id", (req: Request, res: Response) => {

});

export default router;