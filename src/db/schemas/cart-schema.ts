import { Schema } from 'mongoose';
import { ICart } from '../../@types/@types';
import cartItemSchema from './cartItem-schma';


 const cartSchema = new Schema<ICart>({
  userId: { type: String, ref: 'User', required: true },
  items: [cartItemSchema],
});

export default cartSchema;

