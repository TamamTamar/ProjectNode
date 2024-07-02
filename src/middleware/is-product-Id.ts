import { RequestHandler } from "express";

import { productService } from "../services/product-service";
import bizProductsError from "../errors/bizProductsError";



const isProductId: RequestHandler = async (req, res, next) => {
    const product = await productService.getProductById(req.params.id);
    if (product) {
        return next();
    }
    next(new bizProductsError(400, "Product is not found"));
}
export default isProductId;