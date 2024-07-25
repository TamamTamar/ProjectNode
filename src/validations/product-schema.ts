import Joi from "joi";
import { IProductInput } from "../@types/@types";
import { imageSchema } from "./user-schema";

const productSchema = Joi.object<IProductInput>({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  sizes: Joi.array().items(Joi.string().valid("S", "M", "L")).required(),
  price: Joi.number().min(1).max(10000).required(),
  quantity: Joi.number().min(1).max(10000).required(),
  image: imageSchema,
  alt: Joi.string().min(2).max(256).required(),
});

export default productSchema;