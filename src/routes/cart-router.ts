import { Router } from 'express';
import { cartService } from '../services/cart-service';
import { validateToken } from '../middleware/validate-token';
import { validateAddToCart } from '../middleware/validateAddToCart';

const router = Router();

//get cart
router.get('/', validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id; // Ensure user ID is fetched correctly
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const cart = await cartService.getCartById(userId);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});

//add to cart
router.post('/add', ...validateAddToCart, async (req, res, next) => {
    try {
        const { productId, quantity, size, price, variantId} = req.body;
        const userId = req.payload._id;
        const cart = await cartService.addProductToCart(userId, productId,variantId, quantity, size, price);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});

//remove from cart
router.post('/remove', validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const { productId } = req.body;
        const cart = await cartService.removeProductFromCart(userId, productId);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});


//update quantity
router.patch('/update', validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const { productId, quantity } = req.body;
        const cart = await cartService.updateQuantityInCart(userId, productId, quantity);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});

//clear cart
router.delete('/clear', validateToken, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const cart = await cartService.clearCart(userId);
        res.json(cart);
    } catch (e) {
        next(e);
    }
});

export { router as cartRouter };