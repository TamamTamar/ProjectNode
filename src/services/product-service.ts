import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";
import User from "../db/models/user-model";
import bizProductsError from "../errors/BizProductsError";


//generate random barcode
const generateBarcodeNumber = async (): Promise<number> => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Product.findOne({ barcode: r });
    if (!dbRes) {
      return r;
    }
  }
};

export const productService = {

  //create product
  createProduct: async (data: IProductInput, userId: string) => {
    //userId is extracted from the JWT
    const product = new Product(data);
    product.userId = userId;
    product.barcode = await generateBarcodeNumber();

    return product.save();
  },

  //get all products
  getProducts: async () => Product.find(),

  //get product by user id
  getProductByUserId: async (userId: string) => Product.find({ userId: userId }),

  //get product by id
  getProductById: async (id: string) => Product.findById(id),

  //toggle shopping cart
  toggleShoppingCart: async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    // Ensure that productId is a string before comparison
    const productIdStr = productId.toString();

    // Find the product in the cart, checking if productId exists and is a string
    const productInCart = user.cart.find(item => item.productId?.toString() === productIdStr);

    if (productInCart) {
      // Remove the product from the cart
      user.cart = user.cart.filter(item => item.productId?.toString() !== productIdStr);
    } else {
      // Add the product to the cart, ensuring all necessary properties are included
      user.cart.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        size: product.size
      });
    }

    await user.save();
    return user.cart;
  },

//update product
  updateProduct: async (id: string, data: IProductInput) => {
    const product = await Product.findOneAndUpdate({ _id: id }, data, { new: true });
    return product;
  },

  //delete product
  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },

  //get shopping cart by user id
  getShoppingCart: async (userId: string) => {
    const user = await User.findById(userId);
    if (user) {
      return user.cart;
    } else {
      throw new bizProductsError(400, "User not found");
    }
  },
  //replenish stock
  bulkReplenishStock: async (updates: { id: string; size: string; quantity: number }[]) => {
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new bizProductsError(400, "Updates must be a non-empty array");
    }

    const results = [];

    for (const update of updates) {
      if (!update.id || !update.size || !update.quantity) {
        throw new bizProductsError(400, "Each update must include id, size, and quantity");
      }
      if (update.quantity <= 0) {
        throw new bizProductsError(400, "Quantity must be greater than 0");
      }

      const product = await Product.findById(update.id);
      if (!product) throw new bizProductsError(404, `Product not found: ${update.id}`);
      if (!['S', 'M', 'L'].includes(update.size)) throw new bizProductsError(400, `Invalid size: ${update.size}`);

      product.size[update.size] += update.quantity;
      product.quantity += update.quantity;
      await product.save();
      results.push(product);
    }

    return results;
  },

};



