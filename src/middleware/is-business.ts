import { RequestHandler } from "express";
import bizProductsError from "../errors/bizProductsError";
import { validateToken } from "./validate-token";

const _isBusiness: RequestHandler = (req, res, next) => {
  const { isBusiness } = req.payload;

  if (isBusiness) {
    return next();
  }

  next(new bizProductsError(403, "Must be a business"));
};

//export an array of middleware
export const isBusiness = [validateToken, _isBusiness];