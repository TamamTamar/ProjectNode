import { Schema } from "mongoose";
import { IImage } from "../../@types/@types";

const imageSchema = new Schema<IImage>({
  url: { type: String, required: true, minlength: 14, maxlength: 256 },
 // alt: { type: String, minlength: 2, maxlength: 256 },
});

export default imageSchema;
