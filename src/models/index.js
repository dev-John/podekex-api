import mongoose from "mongoose";

import pokemon from "./pokemon.js";
import user from "./user.js";

export const Pokemon = mongoose.model("pokemons", pokemon);
export const User = mongoose.model("users", user);
