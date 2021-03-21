import test from "ava";

import { connect } from "../../db/conn.js";
import { createPokemon, getPokemons } from "../../controllers/pokemon.js";
import { poketest } from "../mocks/_pokemons.js";
import { generateRandomValue } from "../../utils/index.js";
import { Pokemon } from "../../models/index.js";

let createdPokemon;

test.before(async () => {
  await connect();
});

test.after.always(async () => {
  await Pokemon.findByIdAndDelete(createdPokemon._id);
});

test.serial("getPokemons | pass test", async (t) => {
  const pokemons = await getPokemons({ page: 1, rowsPerPage: 10 });

  t.assert(pokemons, "The Pokemons should have been brought");
});

test.serial("createPokemon | pass test", async (t) => {
  poketest.Number = generateRandomValue(); // generates a random value to identify the pokemon
  createdPokemon = await createPokemon(poketest);

  t.assert(createdPokemon, "The PokeTest should have been created");
});
