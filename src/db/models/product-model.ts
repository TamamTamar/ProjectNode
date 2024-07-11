import mongoose from "mongoose";
import productSchema from "../schemas/product-schema";
import { IProduct } from "../../@types/@types";

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;