import { model } from "mongoose";

import cartSchema from "../schemas/cart-schema";
import { ICart } from "../../@types/@types";

const Cart = model<ICart>('Cart', cartSchema);

export default Cart;


