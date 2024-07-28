import _ from "underscore";
import { IProductInput, IVariant } from "../@types/@types";
import Product from "../db/models/product-model";
import { Logger } from "../logs/logger";
import BizProductsError from "../errors/BizProductsError";

const generateBizNumber = async () => {
  // Generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Product.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};

export const productService = {
  // Create product
  createProduct: async (data: IProductInput, userId: string) => {
    const product = new Product(data);
    product.userId = userId;
    product.barcode = await generateBizNumber();
    Logger.log(product.barcode);

    return product.save();
  },

  // Update product
  updateProduct: async (id: string, data: FormData) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new BizProductsError(404, "Product not found");
    return product;
  },

  // Get products
  getProducts: async () => Product.find(),

  // Get product by id
  getProduct: async (id: string) => {
    const product = await Product.findById(id);
    if (!product) throw new BizProductsError(404, "Product not found");
    return product;
  },

  // Get product by user id
  getProductByUserId: async (userId: string) => Product.find({ userId }),

  // Delete product
  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new BizProductsError(404, "Product not found");
    return product;
  },

  // Bulk replenish stock
  bulkReplenishStock: async (updates: { id: string; size: string; quantity: number }[]) => {
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new BizProductsError(400, "Updates must be a non-empty array");
    }

    const results = [];

    for (const update of updates) {
      if (!update.id || !update.size || !update.quantity) {
        throw new BizProductsError(400, "Each update must include id, size, and quantity");
      }
      if (update.quantity <= 0) {
        throw new BizProductsError(400, "Quantity must be greater than 0");
      }

      const product = await Product.findById(update.id);
      if (!product) throw new BizProductsError(404, `Product not found: ${update.id}`);

      const variant = product.variants.find(v => v.size === update.size);
      if (!variant) throw new BizProductsError(400, `Invalid size: ${update.size}`);

      variant.quantity += update.quantity;
      await product.save();
      results.push(product);
    }

    return results;
  },
};
