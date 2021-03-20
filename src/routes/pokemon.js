import { HTTP_CODES, RESPONSE_STATUS, HTTP_VERBS } from "../constants/index.js";
import { createPokemon, getAllPokemons } from "../controllers/pokemon.js";

const { GET, POST } = HTTP_VERBS;

export default [
  {
    method: GET,
    path: "/get-all-pokemons",

    async handler(req, h) {
      try {
        const pokemons = await getAllPokemons();

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data: pokemons });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: POST,
    path: "/create-pokemon",

    async handler(req, h) {
      const pokemon = req.payload;

      try {
        await createPokemon(pokemon);

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
