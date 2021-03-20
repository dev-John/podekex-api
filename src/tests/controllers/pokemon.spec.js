import test from "ava";

import { connect } from "../../db/conn.js";
import { createPokemon, getAllPokemons } from "../../controllers/pokemon.js";
import { poketest } from "../mocks/_pokemons.js";

test.before(async () => {
  await connect();
});

test.serial("getAllPokemons | pass test", async (t) => {
  const pokemons = await getAllPokemons();

  t.assert(pokemons, "The Pokemons should have been brought");
});

test.serial("createPokemon | pass test", async (t) => {
  poketest.Number = Math.random().toString(36).substring(7); // generates a random value to identify the pokemon
  const createdPokemon = await createPokemon(poketest);

  t.assert(createdPokemon, "The PokeTest should have been created");
});
