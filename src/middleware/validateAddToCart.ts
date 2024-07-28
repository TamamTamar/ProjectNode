import { NextFunction, Request, Response } from "express";// Assuming the function is in services/cart-service
import { validateToken } from "./validate-token";
import BizProductsError from "../errors/BizProductsError";
import { cartService } from "../services/cart-service";

// Middleware to validate product and cart ownership
const _validateAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload._id;
        const { productId, variantId, quantity, size ,price} = req.body;

        console.log('Received variantId:', variantId); // בדיקת שליחה נכונה

        if (!userId) {
            return next(new BizProductsError(401, "User not authenticated"));
        }

        await cartService.addProductToCart(userId, productId, variantId, quantity, size,price );

        next();
    } catch (error) {
        next(error);
    }
};

export const validateAddToCart = [validateToken, _validateAddToCart];
