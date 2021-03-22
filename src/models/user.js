import mongoose from "mongoose";

import baseSchema from "./base-schema.js";

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    salt: String,
    hash: String,
    iterations: String,
    tempSecret: String,
    secret: String,
  },
  baseSchema.options
);

export default schema;
