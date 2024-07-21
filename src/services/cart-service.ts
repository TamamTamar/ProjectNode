import Product from '../db/models/product-model';
import { ICart } from '../@types/@types';
import CartModel from '../db/models/cart-model';
import BizProductsError from '../errors/BizProductsError';


export const cartService = {


    // get cart
    getCartById: async (userId: string): Promise<ICart | null> => {
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.productId');
            return cart;
        } catch (error) {
            console.error("Error fetching cart:", error); // Debugging
            throw new BizProductsError(404, 'Error fetching cart');
        }
    },


// add product
    addProductToCart: async (userId: string, productId: string, quantity: number ): Promise<ICart | null> => {
        // First, find the cart for the user
        let cart = await CartModel.findOne({ userId });

        // Check if the product exists in the database
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // If no cart exists, create a new cart
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [{ productId, quantity }]
            });
        }
        // If the cart exists, check if the product already exists in the cart
        else {
            const itemIndex = cart.items.findIndex((item) => item.productId === productId);

            // If the product exists, update the quantity
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
                
         
            }

            // If the product does not exist, add it to the cart
            else {
                cart.items.push({ productId, quantity, price: product.price,title:product.title});
            }
        }

        // Save the cart to the database
        await cart.save();
        return cart;
    },
// remove product
        removeProductFromCart: async (userId: string, productId: string): Promise<ICart | null> => {
            // מצא את העגלה על פי userId
            const cart = await CartModel.findOne({ userId });
    
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            // מצא את האינדקס של המוצר בעגלה
            const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    
            // אם המוצר נמצא בעגלה, הסר את כל המוצרים עם אותו productId
            if (itemIndex > -1) {
                // סנן את המוצרים כדי להסיר את כל המוצרים עם אותו productId
                cart.items = cart.items.filter((item) => item.productId !== productId);
    
                await cart.save();
                return cart;
            }
    
            throw new BizProductsError(400, 'Product not found in cart');
        },
    // clear cart
    clearCart: async (userId: string): Promise<ICart | null> => {
        const cart = await CartModel.findOne({ userId });

        if (!cart) {
            throw new BizProductsError(400,'Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    },
};
