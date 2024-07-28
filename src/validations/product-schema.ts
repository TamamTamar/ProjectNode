import Joi from "joi";
import { IProductInput, IVariant } from "../@types/@types";
import { imageSchema } from "./user-schema";

const variantSchema = Joi.object<IVariant>({
  size: Joi.string().valid("S", "M", "L").required(),
  quantity: Joi.number().min(1).max(10000).required(),
  price: Joi.number().min(1).max(10000).required(),
});

const productSchema = Joi.object<IProductInput>({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  variants: Joi.array().items(variantSchema).required(),
  image: imageSchema.required(),
  alt: Joi.string().min(2).max(256).required(),
});

export default productSchema;
