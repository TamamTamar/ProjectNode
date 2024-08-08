import { Schema } from "mongoose";
import { IUser } from "../../@types/@types";

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true }, // Replace userId with userName
    products: [{
        title: { type: String, required: true },
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        barcode: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String, enum: ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"],
        default: "pending"
    },
    createdAt: { type: Date, default: Date.now },
    orderNumber: { type: String, required: true }, 
});

export default orderSchema;
