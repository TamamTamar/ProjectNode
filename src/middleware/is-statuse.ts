import { RequestHandler } from "express";
import bizProductsError from "../errors/BizProductsError";
import { validateToken } from "./validate-token";

const _isStatus: RequestHandler = (req, res, next) => {

  const validStatuses = ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"];
  if (req.body && validStatuses.includes(req.body.status)) {
    return next();
  }


  next(new bizProductsError(403, "Invalid status"));
};

export const isStatus = [validateToken, _isStatus];
