import { Router } from "express";
import isOrder from "../middleware/Is-order";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrSelfUser } from "../middleware/is-admin-or-self-user";
import { validateToken } from "../middleware/validate-token";
import { orderService } from "../services/order-service";



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


//get order by id
router.get("/:orderId",isOrder, ...isAdmin, async (req, res, next) => {


    try {
        const orderId = req.params.orderId;
        const order = await orderService.getOrder(orderId);
        console.log(order)
        res.json(order);
    } catch (e) {
        next(e);
    }
});

//get orders by user
router.get("/user/:userId", isAdminOrSelfUser, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const orders = await orderService.getOrdersByUser(userId);
        res.json(orders);
    } catch (e) {
        next(e);
    }
});

//cancel order
router.patch("/cancel/:orderId", ...isAdmin, isOrder, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const cancelledOrder = await orderService.cancelOrder(orderId);
        res.json({messege: "Order cancelled successfully", order: cancelledOrder});
    } catch (e) {
        next(e);
    }
});



export { router as orderRouter };
