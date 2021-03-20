import mongoose from "mongoose";

import baseSchema from "./base-schema.js";

const { Schema } = mongoose;

const schema = new Schema(
  {
    Number: { type: String, unique: true },
    Name: String,
    Generation: String,
    About: String,
    Types: [String],
    Resistant: [String],
    Weaknesses: [String],
    "Fast Attack(s)": [
      {
        Name: String,
        Type: String,
        Damage: Number,
      },
    ],
    "Special Attack(s)": [
      {
        Name: String,
        Type: String,
        Damage: Number,
      },
    ],
    Weight: {
      Minimum: String,
      Maximum: String,
    },
    Height: {
      Minimum: String,
      Maximum: String,
    },
    "Buddy Distance": String,
    "Base Stamina": String,
    "Base Attack": String,
    "Base Defense": String,
    "Base Flee Rate": String,
    "Next Evolution Requirements": {
      Amount: Number,
      Name: String,
    },
    "Next evolution(s)": [
      {
        Number: Number,
        Name: String,
      },
    ],
    MaxCP: Number,
    MaxHP: Number,
  },
  baseSchema.options
);

export default schema;
