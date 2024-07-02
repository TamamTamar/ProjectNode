import { RequestHandler } from "express";
import bizProductsError from "../errors/bizProductsError";
import { validateToken } from "./validate-token";

const _isAdminOrSelfUser: RequestHandler = (req, _, next) => {
    const requestedUserId = req.params.userId;
    const userId = req.payload._id;

    if (requestedUserId === userId || req.payload?.isAdmin) {
        return next();
    }

    next(new bizProductsError(403, "Must be the requested user or admin"));
};

export const isAdminOrSelfUser = [validateToken, _isAdminOrSelfUser];
