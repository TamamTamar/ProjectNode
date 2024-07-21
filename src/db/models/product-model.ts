import { model } from "mongoose";
import { IProduct } from "../../@types/@types";
import productSchema from "../schemas/product-schema";

const Product = model<IProduct>("Product", productSchema);

export default Product;