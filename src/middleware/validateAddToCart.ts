import { NextFunction, Request, Response } from "express";
import CartModel from "../db/models/cart-model";
import Product from "../db/models/product-model";
import BizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";

// Middleware to validate product and cart ownership
const _validateAddToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.payload._id;
        const { productId, variantId, quantity, size } = req.body;
        
        console.log('Received variantId:', variantId); // בדיקת שליחה נכונה

        if (!userId) {
            return next(new BizProductsError(401, "User not authenticated"));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new BizProductsError(404, "Product not found"));
        }

        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (!variant) {
            return next(new BizProductsError(404, "Variant not found"));
        }

        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [{
                    productId, 
                    variantId,
                    quantity, 
                    size, 
                    title: product.title, 
                    price: product.price,
                    image: product.image
                }]
            });
            await cart.save();
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId === productId && item.size === size && item.variantId === variantId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ 
                    productId, 
                    variantId,
                    quantity, 
                    size, 
                    title: product.title, 
                    price: product.price, 
                    image: product.image
                });
            }
            await cart.save();
        }

        req.product = product;
        next();
    } catch (error) {
        next(error);
    }
};

export const validateAddToCart = [validateToken, _validateAddToCart];

