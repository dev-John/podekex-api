import mongoose from "mongoose";

import pokemon from "./pokemon.js";

export const Pokemon = mongoose.model("pokemons", pokemon);
