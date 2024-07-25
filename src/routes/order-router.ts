import { Router } from "express";
import { orderService } from "../services/order-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrSelfUser } from "../middleware/is-admin-or-self-user";
import { isAdminOrOwner } from "../middleware/isAdminOrOwner";

const router = Router();

//create order
router.post("/", validateToken, async (req, res, next) => {
    try {
        const userId = req.payload._id;
        const products = req.body.products;

        const order = await orderService.createOrder(userId, products);
        res.status(201).json(order);
    } catch (e) {
        next(e);
    }
});

//get order
router.get("/:id", ...isAdminOrOwner, async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrder(orderId);
        res.json(order);
    } catch (e) {
        next(e);
    }
});

//get oreder by user
router.get("/user/:userId", isAdminOrSelfUser, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orders = await orderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

//get all orders
router.get("/", ...isAdmin, async (_, res, next) => {
    try {
        const { orders, count } = await orderService.getAllOrders();
        const response = { AmountsOrders: count, orders }
        res.json(response);
    } catch (e) {
        next(e);
    }
});

//cancel order
router.patch("/cancel/:orderId", ...isAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const cancelledOrder = await orderService.cancelOrder(orderId);
        res.json(cancelledOrder);
    } catch (e) {
        next(e);
    }
});



export { router as orderRouter };