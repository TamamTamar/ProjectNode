import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";
import { Logger } from "../logs/logger";
import BizProductsError from "../errors/BizProductsError";


const generateBizNumber = async () => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Product.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};

/* const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}; */

export const productService = {
  /* createProduct: async (data: IProductInput, userId: string) => {
     if (!data.size) {
       data.size = 'M';
     }
     //userId is extracted from the JWT
     const product = new Product(data);
     product.userId = userId;
     product.barcode = await generateBizNumber();
 
     Logger.log(product.barcode);
 
     return product.save();
   }, */

    createProduct: async (data: IProductInput, userId: string) => {
      
      const product = new Product(data);
      product.userId = userId;
      product.barcode = await generateBizNumber();

      Logger.log(product.barcode);

      return product.save();
    },

  updateProduct: async (id: string, data: FormData) => {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) throw new Error("Product not found");
      return product;
    },
 


  getProducts: async () => Product.find(),

  getProduct: async (id: string) => Product.findById(id),

  getProductByUserId: async (userId: string) => Product.find({ userId: userId }),


/* 
  toggleShoppingCart: async (userId: string, productId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new BizCardsError(404, "User not found");

    const product = await Product.findById(productId);
    if (!product) throw new BizCardsError(404, "Product not found");

    const productInCart = user.cart.find(item => item.productId.toString() === productId);
    if (productInCart) {
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    } else {
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

  getShoppingCart: async (userId: string) => {
    const user = await User.findById(userId).populate('cart.productId');
    if (!user) throw new BizCardsError(404, "User not found");
    return user.cart;
  }, */

 /*  updateProduct: async (id: string, data: IProductInput, userId: string) => {
    const product = await Product.findOneAndUpdate({ _id: id, userId: userId }, data, { new: true });
    if (!product) throw new Error("Product not found or user unauthorized to update this product");
    return product;
  }, */

  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },

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
      if (!['S', 'M', 'L'].includes(update.size)) throw new BizProductsError(400, `Invalid size: ${update.size}`);

      product.sizes[update.size] += update.quantity;
      product.quantity += update.quantity;
      await product.save();
      results.push(product);
    }

    return results;
  },

};


