import { Pokemon } from "../models/index.js";

export function getAllPokemons() {
  return Pokemon.find({}).orFail(() => {
    throw new Error("Não foram encontrados pokemons cadastrados");
  });
}

export function createPokemon(pokemon) {
  return Pokemon.create(pokemon).catch((error) => {
    console.error(error);
    throw new Error("Falha ao cadastrar Pokemon");
  });
}

// export function updatePokemon(pokemon) {}
