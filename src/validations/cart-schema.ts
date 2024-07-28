import Joi from "joi";

const cartItemSchema = Joi.object({
  productId: Joi.string().required(),
  variantId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  size: Joi.string().valid("S", "M", "L").required(),
  price: Joi.number().min(1).required(),
});

const cartSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().items(cartItemSchema).required(),
});

export default cartSchema;
