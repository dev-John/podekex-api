import { Pokemon } from "../models/index.js";

export function getAllPokemons() {
  return Pokemon.find({}).orFail(() => {
    throw new Error("Não foram encontrados pokemons cadastrados");
  });
}
