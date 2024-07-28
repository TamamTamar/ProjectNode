import Product from '../db/models/product-model';
import { ICart, ICartWithTotals } from '../@types/@types';
import CartModel from '../db/models/cart-model';
import BizProductsError from '../errors/BizProductsError';

export const cartService = {
    getCartById: async (userId: string): Promise<ICartWithTotals | null> => {
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.productId');

            if (!cart) {
                return null;
            }

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

            return {
                ...cart.toObject(),
                totalQuantity,
                totalPrice
            } as ICartWithTotals;

        } catch (error) {
            console.error("Error fetching cart:", error);
            throw new BizProductsError(400, 'Error fetching cart');
        }
    },

    addProductToCart: async (
        userId: string, 
        productId: string, 
        variantId: string,  // Updated to include variantId
        quantity: number, 
        size: string,
        price: number
    ): Promise<ICart | null> => {
        let cart = await CartModel.findOne({ userId });
    
        const product = await Product.findById(productId);
        if (!product) {
            throw new BizProductsError(404, 'Product not found');
        }
    
        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (!variant) {
            throw new BizProductsError(404, 'Variant not found');
        }
    
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [{ 
                    productId, 
                    variantId,  // Include variantId here
                    quantity, 
                    size, 
                    title: product.title, 
                    price, 
                    image: product.image
                }]
            });
        } else {
            const itemIndex = cart.items.findIndex((item) => item.productId === productId && item.size === size && item.variantId === variantId);
    
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ 
                    productId, 
                    variantId,  // Include variantId here
                    quantity, 
                    size, 
                    title: product.title, 
                    price, 
                    image: product.image
                });
            }
        }
    
        await cart.save();
        return cart;
    },

    removeProductFromCart: async (userId: string, productId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizProductsError(404, 'Cart not found');
        }

        cart.items = cart.items.filter((item) => item.productId !== productId);

        await cart.save();
        return cart;
    },

    updateQuantityInCart: async (userId: string, productId: string, quantity: number): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            throw new BizProductsError(404,'Cart not found');
        }
        const itemIndex = cart.items.findIndex((item) => item.productId === productId);
        if (itemIndex === -1) {
            throw new BizProductsError(404,'Product not found in cart');
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        return cart;
    },

    clearCart: async (userId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizProductsError(404,'Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    }
};
