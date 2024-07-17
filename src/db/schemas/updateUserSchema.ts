import Joi from "joi";
import { phoneRegex } from "../../validations/patterns";
import { addressSchema, imageSchema } from "../../validations/user-schema";
import { IName, IUpdateUserType } from "../../@types/@types";

const updateUserSchema = Joi.object<IUpdateUserType>({
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(50),
        middle: Joi.string().min(0),
        last: Joi.string().min(2).max(50),
    }),
    phone: Joi.string().pattern(phoneRegex),
   // image: imageSchema,
    address: addressSchema,
});

export default updateUserSchema;