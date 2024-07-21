import { Schema } from "mongoose";
import { IUser } from "../../@types/@types";
import addressSchema from "./address-schema";
import nameSchema from "./name-schema";
import cartSchema from "./cart-schema";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
 /*  image: { type: imageSchema, required: false },
  alt: { type: String, required: false }, */
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  password: { type: String, required: true, minlength: 7, maxlength: 300 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },

  //isBusiness: { required: true, type: Boolean },

  createdAt: { type: Date, default: new Date(), required: false },
  isAdmin: { required: false, type: Boolean, default: false },
 // cart: { type: cartSchema, ref: "Cart" },
});

export default userSchema;
