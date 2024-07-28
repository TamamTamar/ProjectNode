import Product from "../db/models/product-model";
import Order from "../db/models/order-model";
import { IOrderProduct } from "../@types/@types";
import BizProductsError from "../errors/BizProductsError";

export const orderService = {

    //create order
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            // תהליך יצירת המוצרים בהזמנה
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new BizProductsError(404, "Product not found");

                const variant = productDetails.variants.find(v => v.size === product.size);
                if (!variant) throw new BizProductsError(404, "Variant not found");
                if (variant.quantity < product.quantity) throw new BizProductsError(400, "Not enough stock");

                // עדכון מלאי המוצר
                variant.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: variant.price,
                    size: product.size,
                };
            }));

            // חישוב הסכום הכולל
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            // יצירת ההזמנה
            const order = new Order({
                userId,
                products: orderProducts,
                totalAmount,
                orderNumber: Date.now().toString(),
            });

            return await order.save();
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw error;
        }
    },

    //cancel order
    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (order.status === "cancelled") {
            throw new Error("Order is already cancelled");
        }

        // החזרת המלאי
        for (const product of order.products) {
            const productDetails = await Product.findById(product.productId);
            if (productDetails) {
                const variant = productDetails.variants.find(v => v.size === product.size);
                if (variant) {
                    variant.quantity += product.quantity;
                }
                productDetails.sold -= product.quantity;
                await productDetails.save();
            }
        }

        order.status = "cancelled";
        return await order.save();
    },

    //get order
    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    //get orders by user
    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },

    //get all orders
    getAllOrders: async () => {
        const orders = await Order.find({ status: { $ne: "cancelled" } }).populate("products.productId");
        const count = await Order.countDocuments({ status: { $ne: "cancelled" } });
        return { orders: orders.map(order => order.toObject()), count };
    },
};
