import { Router } from "express";
import { isAdmin } from "../middleware/is-admin";
import { analyticsService } from "../services/analytics-service";
import isProductId from "../middleware/is-product-Id";
import { isStatus } from "../middleware/is-statuse";
import bizProductsError from "../errors/BizProductsError";


const router = Router();


//get all orders
router.get("/all-orders", ...isAdmin, async (req, res, next) => {
    try {
        const orders = await analyticsService.getAllOrders();
        res.json(orders);
    } catch (e) {
        next(e);
    }
});


//get sales by date
router.get("/sales-by-date", ...isAdmin, async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        // המרת תאריכים למבנה תאריך ובדיקת פורמט
        if (!startDate || !endDate) {
            throw new bizProductsError(400, "Start date and end date are required");
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new bizProductsError(400, "Invalid date format");
        }

        if (end < start) {
            throw new bizProductsError(400, "End date cannot be earlier than start date");
        }

        const sales = await analyticsService.getSalesByDate(start, end);
        res.json(sales);
    } catch (e) {
        next(e);
    }
});


//get inventory
router.get("/inventory", ...isAdmin, async (req, res, next) => {
    try {
        const inventory = await analyticsService.getInventory();
        res.json(inventory);
    } catch (e) {
        next(e);
    }
});

//get product sales by id
router.get("/product-sales/:id", ...isAdmin, isProductId, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productSales = await analyticsService.getProductSales(productId);
        res.json(productSales);
    } catch (e) {
        next(e);
    }
});

//get order status
router.get("/order-status", ...isAdmin, async (req, res, next) => {
    try {
        const orderStatus = await analyticsService.getOrderStatus();
        res.json(orderStatus);
    } catch (e) {
        next(e);
    }
});
//update order status
router.patch("/status/:orderId", ...isAdmin, isStatus, async (req, res, next) => {

    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const updatedOrder = await analyticsService.updateOrderStatus(orderId, status);
        res.json(updatedOrder);
    } catch (e) {
        next(e);
    }
});

//get top selling products
router.get("/products/top-selling", ...isAdmin, async (req, res, next) => {
    try {
        const topSellingProducts = await analyticsService.getTopSellingProducts();
        res.json(topSellingProducts);
    } catch (e) {
        next(e);
    }
});
//get users with most orders
router.get("/active-users", ...isAdmin, async (req, res, next) => {
    try {
        const usersByOrdersCount = await analyticsService.getUsersWithMostOrders();
        res.json(usersByOrdersCount);
    } catch (e) {
        next(e);
    }
});

export { router as analyticsRouter };
