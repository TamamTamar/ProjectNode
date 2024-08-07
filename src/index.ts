
import express, { json } from "express";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { Logger } from "./logs/logger";
import cors from 'cors';
import { analyticsRouter } from "./routes/analytics-router";
import { orderRouter } from "./routes/order-router";
import path from "path";
import { cartRouter } from "./routes/cart-router";
import { messageRouter } from "./routes/message-router";
import { productRouter } from "./routes/products-router";
import { usersRouter } from "./routes/users-router";

configDevEnv();
connect();

Logger.error("hi");

const app = express();
console.log(process.env.JWT_SECRET);
//middleware chain:
app.use(json());
app.use(morgan("dev"));
app.use(cors());
//http://localhost:8080/api/v1/users  



/* app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); */
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/cart", cartRouter);  // הוספת הנתיב לעגלת הקניות
app.use(express.static("public"));
app.use(errorHandler);
app.use(notFound);

//start the server:
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  console.log(`App is running in ${process.env.NODE_ENV} mode`);
});