import Joi from "joi";
import { IName, IupdateUserType } from "../../@types/@types";
import { phoneRegex } from "../../validations/patterns";
import { addressSchema, imageSchema } from "../../validations/user-schema";

const updateUserSchema = Joi.object<IupdateUserType>({
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(50),
        middle: Joi.string().min(0),
        last: Joi.string().min(2).max(50),
    }),
    phone: Joi.string().pattern(phoneRegex),
    image: imageSchema,
    address: addressSchema,
});

export default updateUserSchema;