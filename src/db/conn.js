import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connect() {
  const dbConfig = {
    dbName: process.env.MONGO_DB_NAME,

    auth: {
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PWD,
    },

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000,
  };

  const mongoUrl = process.env.MONGO_URL;

  return mongoose.connect(mongoUrl, dbConfig);
}

export function disconnect() {
  return mongoose.disconnect();
}
