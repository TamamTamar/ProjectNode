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
  variantId: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image: IImage;
}

export interface ICart {
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

// טיפוס עבור גרסאות של מוצר
export type IVariant = {
  _id?: string;
  size: string;
  quantity: number;
  price: number;
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

// טיפוס עבור מוצר (כולל פרטים נוספים)
export type IProduct = IProductInput & {
  _id: string;
  barcode: number;
  createdAt: Date;
  shoppingCart: string[];
  sold: number;
  userId: string;
};

// טיפוס עבור פרטי מוצר בהזמנה
export type IOrderProduct = {
  productId: string;
  quantity: number;
  size: string;
  price: number;
  title: string;
};

// טיפוס עבור הזמנה
export type IOrder = {
  userName: string;
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
export type IMessage ={
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt?: Date;
}
