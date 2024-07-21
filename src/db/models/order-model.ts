import { model } from "mongoose";
import orderSchema from "../schemas/order-schema";

const Order = model("Order", orderSchema);
export default Order;
