import { Schema } from "mongoose";
import { IUser } from "../../@types/@types";
import nameSchema from "./name-schema";
import addressSchema from "./address-schema";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
    unique: true,
    lowercase: true, // כל אימייל יישמר באותיות קטנות
  },
  password: { type: String, required: true, minlength: 7, maxlength: 300 },
  phone: { type: String, required: true, minlength: 9, maxlength: 11 },
  createdAt: { type: Date, default: new Date(), required: false },
  isAdmin: { required: false, type: Boolean, default: false },
});

export default userSchema;
