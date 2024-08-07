import mongoose, { ConnectOptions } from "mongoose";
import { Logger } from "../logs/logger";
import initDB from "./init-db";

const connect = async () => {
  const connectionString = process.env.DB_CONNECTION_STRING;

  if (!connectionString) {
    Logger.log("DB_CONNECTION_STRING is not defined in your .env file");
    return;
  }

  try {
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // זמן המתנה לבחירת השרת
      socketTimeoutMS: 45000, // זמן המתנה לשאילתות
    };

    await mongoose.connect(connectionString, options);

    await initDB();

    Logger.log("Database Connected");
  } catch (e) {
    Logger.log("Database not connected");
    Logger.log(e);
  }
};

export default connect;
