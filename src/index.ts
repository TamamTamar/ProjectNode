import cors from 'cors';
import express, { json } from "express";
import morgan from "morgan";
import configDevEnv from "../config";
import connect from "./db/connection";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import { analyticsRouter } from "./routes/analytics-router";
import { cartRouter } from "./routes/cart-router";
import { messageRouter } from "./routes/message-router";
import { orderRouter } from "./routes/order-router";
import { productRouter } from "./routes/products-router";
import usersRouter from "./routes/users-router";
import path from 'path';
configDevEnv();
connect();



const app = express();

app.use(json());
app.use(morgan("dev"));
app.use(cors());

// נתיב להעלאת תמונת מוצר
/* app.post('/api/v1/products/upload', upload.single('image'), (req, res) => {
  res.send('File uploaded successfully');
}); */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/messages", messageRouter);
app.use(express.static("public"));
app.use(errorHandler);
app.use(notFound);

app.listen(8080, () => {
  console.log("Server is running on https://finalproject-store.onrender.com/");
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});
