import Product from "../db/models/product-model";
import Order from "../db/models/order-model";
import { IOrderProduct } from "../@types/@types";
import BizProductsError from "../errors/BizProductsError";
import User from "../db/models/user-model";

export const orderService = {

    // Create order
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            // Fetch the user details
            const user = await User.findById(userId);
            if (!user) throw new BizProductsError(404, "User not found");

            // Process order products
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) throw new BizProductsError(404, "Product not found");

                const variant = productDetails.variants.find(v => v.size === product.size);
                if (!variant) throw new BizProductsError(404, "Variant not found");
                if (variant.quantity < product.quantity) throw new BizProductsError(400, "Not enough stock");

                // Update product stock
                variant.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: variant.price,
                    size: variant.size,
                };
            }));

            // Calculate total amount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            // Create the order with user's name
            const order = new Order({
                userName: `${user.name.first} ${user.name.middle || ''} ${user.name.last}`, // Format the user's name
                products: orderProducts,
                totalAmount,
                orderNumber: `ORD-${Date.now().toString()}`, // You can use a more sophisticated method for order numbers
            });

            return await order.save();
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw error;
        }
    },


    // Cancel order
    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (order.status === "cancelled") {
            throw new Error("Order is already cancelled");
        }

        // Return stock
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

    // Get order
    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    // Get orders by user
    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },

    // Get all orders
/*     getAllOrders: async () => {
        const orders = await Order.find({ status: { $ne: "cancelled" } }).populate("products.productId");
        const count = await Order.countDocuments({ status: { $ne: "cancelled" } });
        return { orders: orders.map(order => ({
            ...order.toObject(),
            userName: order.userName, // Assuming userName is included in the Order schema
        })), count };
    }, */
};
