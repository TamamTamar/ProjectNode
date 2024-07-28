// טיפוס עבור שמות
export type IName = {
  first: string;
  middle?: string;
  last: string;
};

// טיפוס עבור כתובת
export type IAddress = {
  street: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  houseNumber: number;
};

// טיפוס עבור תמונה
export type IImage = {
  url: string;
};

// טיפוס עבור פרטי משתמש בעת הרשמה
export type IUserInput = {
  email: string;
  phone: string;
  password: string;
  address: IAddress;
  name: IName;
};

// טיפוס עבור משתמש (כולל פרטים נוספים)
export type IUser = IUserInput & {
  _id?: string;
  createdAt: Date;
  isAdmin: boolean;
  cart?: ICart[];
};

// טיפוס עבור פריט בעגלת קניות
export interface ICartItem {
  productId: string;
  quantity: number;
  title: string;
  price: number;
  size: string;
  image: IImage;
}

// טיפוס עבור עגלת קניות
export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

// טיפוס עבור עגלת קניות עם סיכומים
export interface ICartWithTotals extends ICart {
  totalQuantity: number;
  totalPrice: number;
}

// טיפוס עבור פרטי התחברות
export type ILogin = {
  email: string;
  password: string;
};

// טיפוס עבור Payload של JWT
export type IJWTPayload = {
  _id: string;
  isAdmin: boolean;
};
export type IProduct = IProductInput & {
  barcode: number;
  createdAt: Date;
  shoppingCart: string[];
  quantity: number;
  sold: number;
  userId: string;
};


// טיפוס עבור פרטי מוצר בעת יצירה
export type IProductInput = {
  title: string;
  subtitle: string;
  description: string;
  image: IImage;
  alt: string;
  variants: IVariant[];
};

// טיפוס עבור גרסאות של מוצר
export type IVariant = {
  size: string;
  quantity: number;
  price: number;
};

// טיפוס עבור מוצר (כולל פרטים נוספים)

// טיפוס עבור פרטי מוצר בהזמנה
export type IOrderProduct = {
  productId: string;
  quantity: number;
  size: string;
};

// טיפוס עבור הזמנה
export type IOrder = {
  userId: string;
  products: IOrderProduct[];
  totalAmount: number;
  status: string;
  createdAt: Date;
  orderNumber: string;
};

// טיפוס עבור שאילתה של מכירות לפי תאריך
export interface SalesByDateQuery {
  startDate: string;
  endDate: string;
}

// טיפוס עבור עדכון פרטי משתמש
export type IUpdateUserType = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
};
