import productSchema from "../../validations/product-schema";
import loginSchema from "../../validations/login-schema";
import userSchema from "../../validations/user-schema";
import { validateSchema } from "./validate-schema";
import updateUserSchema from "../../db/schemas/updateUserSchema";

export const validateUser = validateSchema(userSchema);
export const validateLogin = validateSchema(loginSchema);
export const validateProduct = validateSchema(productSchema);
export const validateUpdateUser = validateSchema(updateUserSchema);
