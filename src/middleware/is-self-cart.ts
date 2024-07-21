import { RequestHandler } from "express";
import bizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";
import Cart from "../db/models/cart-model";
import { productService } from "../services/product-service";

const _isSelfCart: RequestHandler = (req, res, next) => {
    const userId = req.payload._id;
    const 
    cart = await get
    if (userId === Cart) {


if (req.payload&& req.payload._id === req.body.userId) {

    return next(); 
}
console.log(req.payload)
  next(new bizProductsError(403, "Only the user is allowed"));
};

export const isSelfCart = [validateToken, _isSelfCart];


const _isProductOwnerOrAdmin: RequestHandler = async (req, _, next) => {
    const card = await productService.getProductById(req.params.id);
    const userId = req.payload._id;

    if (card.userId === userId || req.payload?.isAdmin) {
        console.log(card.userId, userId, req.payload?.isAdmin);
        return next();

    }

    else next(new bizProductsError(403, "Only the card owner or admin is allowed"))
    console.log(card.userId, userId);
};

export const isProductOwnerOrAdmin = [validateToken, _isProductOwnerOrAdmin];