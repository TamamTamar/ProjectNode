import { IMessage } from "../@types/@types";
import Message from "../db/models/message-model";
import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import User from "../db/models/user-model";
import bizProductsError from "../errors/BizProductsError";
import { Logger } from "../logs/logger";

export const analyticsService = {

    // get inventory
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            title: product.title,
            variants: product.variants.map(variant => ({
                size: variant.size,
                quantity: variant.quantity,
                price: variant.price,
                totalRevenue: variant.price * variant.quantity,
            })),
        }));
    },

    // get all orders
    getAllOrders: async () => {
        const orders = await Order.find().populate({
            path: 'userId',
            select: 'name', // אכלוס השדה name מתוך userId
        }).populate('products.productId');
    
        const count = await Order.countDocuments(); // ספירת כמות ההזמנות
    
        return {
            orders: orders.map(order => ({
                orderNumber: order.orderNumber,
                orderId: order._id,
                userId: order.userId._id, // הוספת השדה name של המשתמש
                products: order.products.map(product => ({
                    productId: product.productId._id,
                    title: product.title, // שימוש ב- productId כדי לקבל את ה-title
                    barcode: product.barcode, // שימוש ב- productId כדי לקבל את ה-barcode
                    quantity: product.quantity,
                    price: product.price,
                    size: product.size,
                })),
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,

            })),
            count // הוספת כמות ההזמנות לפלט
        };
    },
    
    /*     getAllOrders: async () => {
        const orders = await Order.find({ status: { $ne: "cancelled" } }).populate("products.productId");
        const count = await Order.countDocuments({ status: { $ne: "cancelled" } });
        return { orders: orders.map(order => order.toObject()), count };
    }, */
    



    // get sales by date
    getSalesByDate: async (startDate: Date, endDate: Date) => {
        if (!startDate || !endDate) {
            throw new bizProductsError(400, "Start date and end date are required");
        }

        if (new Date(endDate) < new Date(startDate)) {
            throw new bizProductsError(400, "End date cannot be earlier than start date");
        }

        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const salesByDate = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: adjustedEndDate,
                    },
                    status: { $ne: "cancelled" },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalAmount: { $sum: "$totalAmount" },
                    totalSales: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const overallSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: adjustedEndDate,
                    },
                    status: { $ne: "cancelled" },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$totalAmount" },
                    totalSales: { $sum: 1 },
                },
            },
        ]);

        return {
            salesByDate,
            overallSales: overallSales[0] || { totalAmount: 0, totalSales: 0 },
        };
    },

    // get top selling products
/*     getTopSellingProducts: async () => {
        const products = await Product.find().sort({ 'variants.sold': -1 }).limit(5);
        return products.map(product => ({
            title: product.title,
            variants: product.variants.map(variant => ({
                size: variant.size,
                sold: variant.sold,
                price: variant.price,
                totalRevenue: variant.sold * variant.price,
            })),
        }));
    }, */

    // get product sales
    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        return {
            title: product.title,
            variants: product.variants.map(variant => ({
                size: variant.size,
                //sold: variant.sold,
            })),
        };
    },

    // get order status
    getOrderStatus: async () => {
        const orders = await Order.find({}, { status: 1 });
        console.log("Orders statuses:", orders);

        const statuses = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        console.log("Grouped statuses:", statuses);
        return statuses;
    },

    // update order status
    updateOrderStatus: async (orderId: string, status: string) => {
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new bizProductsError(404, "Order not found");
        }

        return order;
    },


    // get users with most orders
  /*   getUsersWithMostOrders: async () => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: "$userId",
                    orders: { $push: "$$ROOT" },
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" },
                },
            },
            {
                $sort: { totalOrders: -1 },
            },
        ]);

        const userIds = orders.map(order => order._id);
        const users = await User.find({ _id: { $in: userIds } });

        const result = orders.map(order => {
            const user = users.find(u => u._id.equals(order._id));
            return {
                userId: order._id,
                userName: user ? user.name : 'Unknown User',
                totalOrders: order.totalOrders,
                totalAmount: order.totalAmount,
                orders: order.orders.map(o => ({
                    orderNumber: o.orderNumber,
                    totalAmount: o.totalAmount,
                    products: o.products.map(p => ({
                        productId: p.productId,
                        productName: p.productName,
                        quantity: p.quantity,
                        price: p.price,
                    })),
                    createdAt: o.createdAt,
                })),
            };
        });

        return result;
    }, */
};
