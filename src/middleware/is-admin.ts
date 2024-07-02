import { RequestHandler } from "express";
import bizProductsError from "../errors/bizProductsError";
import { validateToken } from "./validate-token";

const _isAdmin: RequestHandler = (req, _, next) => {
  if (req.payload?.isAdmin) {
    return next();
  }

  next(new bizProductsError(403, "Must be admin"));
};

export const isAdmin = [validateToken, _isAdmin];
