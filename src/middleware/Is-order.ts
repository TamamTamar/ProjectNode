import { RequestHandler } from "express";
import bizProductsError from "../errors/BizProductsError";
import Order from "../db/models/order-model";

const isOrder: RequestHandler = async (req, _, next) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
            return next(new bizProductsError(403, "Order not found"));
        }

        if (order.status !== "cancelled") {
            return next();
        } else {
            return next(new bizProductsError(400, "Order is cancelled"));
        }
    } catch (e) {
        return next(e);
    }
};

export default isOrder;
