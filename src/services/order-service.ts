import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import { IOrderProduct } from "../@types/@types";
import bizProductsError from "../errors/BizProductsError";


export const orderService = {
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails)
                    throw new bizProductsError(404, "Product not found");
                if (productDetails.quantity < product.quantity)
                    throw new bizProductsError(400, "Not enough stock");

                // Update product stock
                productDetails.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: productDetails.price,
                };
            }));

            // Calculate totalAmount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            const order = new Order({
                userId,
                products: orderProducts,
                totalAmount,
            });

            return await order.save();
        } catch (e) {
            throw e;
        }
    },


    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        /*     if (!order)
                 throw new bizProductsError(404,"Order not found");
    
            if (order.status === "cancelled") {
                throw new bizProductsError(400,"Order is already cancelled");
            }  */

        // Return the stock
        for (const product of order.products) {
            const productDetails = await Product.findById(product.productId);
            if (productDetails) {
                productDetails.quantity += product.quantity;
                productDetails.sold -= product.quantity;
                await productDetails.save();
            }
        }

        order.status = "cancelled";
        return await order.save();
    },



    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        return order;
    },

    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },

};
