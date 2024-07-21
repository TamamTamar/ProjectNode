import { Schema } from "mongoose";
import { ICartItem } from "../../@types/@types";


const cartItemSchema = new Schema<ICartItem>({
    productId: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

export default cartItemSchema