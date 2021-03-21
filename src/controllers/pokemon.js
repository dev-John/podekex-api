import { Pokemon } from "../models/index.js";
import { generateRandomValue } from "../utils/index.js";

export async function getPokemons({ page, rowsPerPage }) {
  const pokemons = await Pokemon.find({})
    .limit(parseInt(rowsPerPage))
    .skip(parseInt(rowsPerPage) * parseInt(page))
    .select({
      Name: 1,
      Generation: 1,
      Types: 1,
      "Special Attack(s)": 1,
    })
    .orFail(() => {
      throw new Error("Não foram encontrados pokemons cadastrados");
    });

  const totalPokemons = await Pokemon.count({});

  return { pokemons, totalPokemons };
}

export async function getPokemonByName(name) {
  return Pokemon.find({ Name: { $regex: name, $options: "i" } })
    .select({
      Name: 1,
      Generation: 1,
      Types: 1,
      "Special Attack(s)": 1,
    })
    .orFail(() => {
      throw new Error("Não foram encontrados pokemons com esse nome");
    });
}

export function createPokemon(pokemon) {
  const { name, generation, types } = pokemon;
  const specialAttacks = pokemon.attacks.split(",");
  let finalAttacks = [];

  specialAttacks.forEach((attack) => {
    finalAttacks.push({
      Name: attack,
      Type: "Normal",
      Damage: 10,
    });
  });

  const poke = {
    Name: name,
    Number: generateRandomValue(),
    Generation: generation,
    Types: types.split(","),
    "Special Attack(s)": finalAttacks,
  };

  return Pokemon.create(poke).catch((error) => {
    console.error(error);
    throw new Error("Falha ao cadastrar Pokemon");
  });
}

export function deletePokemon(_id) {
  return Pokemon.findByIdAndDelete(_id).orFail(() => {
    throw new Error("Falha ao excluir Pokemon");
  });
}

export function updatePokemon(pokemon) {
  const { _id, name, generation, types, attacks } = pokemon;

  const attacksArray = attacks.split(",");

  let finalAttacks = [];

  attacksArray.forEach((attack) => {
    finalAttacks.push({
      Name: attack,
      Type: "Normal",
      Damage: 10,
    });
  });

  return Pokemon.findByIdAndUpdate(_id, {
    Name: name,
    Generation: generation,
    Types: types.split(","),
    "Special Attack(s)": finalAttacks,
  });
}
