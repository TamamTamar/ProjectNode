import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import User from "../db/models/user-model";
import bizProductsError from "../errors/BizProductsError";

export const analyticsService = {

    //get inventory
    getInventory: async () => {
        const products = await Product.find();
        return products.map(product => ({
            title: product.title,
            quantity: product.quantity,
            sold: product.sold,
        }));
    },
    //get all orders
    getAllOrders: async () => {
        const orders = await Order.find().populate({
            path: 'userId',
            select: 'name', // אכלוס השדה name מתוך userId

        }).populate('products.productId');

        console.log(orders); // Add this line to log the orders data

        return orders.map(order => ({
            orderId: order._id,
            userId: order.userId._id,
            products: order.products.map(product => ({
                productId: product.productId._id,
                title: product.title,
                barcode: product.barcode,
                quantity: product.quantity,
                price: product.price,
            })),
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
        }));
    },

    //get sales by date
    getSalesByDate: async (startDate: Date, endDate: Date) => {

        if (!startDate || !endDate) {
            throw new bizProductsError(400, "Start date and end date are required");
        }

        if (new Date(endDate) < new Date(startDate)) {
            throw new bizProductsError(400, "End date cannot be earlier than start date");
        }

        //
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const salesByDate = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // קיבוץ לפי יום
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
            {
                $sort: { _id: 1 }, // מיון לפי תאריך עולה
            },
        ]);

        const overallSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: null, // קיבוץ כל המסמכים יחד
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
        ]);

        return {
            salesByDate,
            overallSales: overallSales[0] || { totalAmount: 0, totalSales: 0 },
        };
    },

//get top selling products
    getTopSellingProducts: async () => {
        const products = await Product.find().sort({ sold: -1 }).limit(5);
        return products.map(product => ({
            title: product.title,
            sold: product.sold,
            price: product.price,
            totalRevenue: product.sold * product.price  // חישוב סך ההכנסות
        }));
    },

    //get product sales
    getProductSales: async (productId: string) => {
        const product = await Product.findById(productId);
        return {
            title: product.title,
            sold: product.sold,
        };
    },

//get order status
    getOrderStatus: async () => {
        const orders = await Order.find({}, { status: 1 }); // נביא רק את השדה status
        console.log("Orders statuses:", orders);

        const statuses = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        console.log("Grouped statuses:", statuses);
        return statuses;
    },

    updateOrderStatus: async (orderId: string, status: string) => {

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new bizProductsError(404, "Order not found");
        }

        return order;
    },
    getUsersWithMostOrders: async () => {
        // שלב 1: איסוף ההזמנות לפי יוזר
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: "$userId",
                    orders: { $push: "$$ROOT" },
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { totalOrders: -1 } // סידור לפי מספר ההזמנות בסדר יורד
            }
        ]);

        // שלב 2: איסוף פרטי היוזרים
        const userIds = orders.map(order => order._id);
        const users = await User.find({ _id: { $in: userIds } });

        // שלב 3: מיפוי התוצאות לפורמט הרצוי
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
                        age: p.age
                    })),
                    createdAt: o.createdAt
                }))
            };
        });

        return result;
    },
};
