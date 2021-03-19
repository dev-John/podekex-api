import { HTTP_CODES, RESPONSE_STATUS, HTTP_VERBS } from "../constants/index.js";
import { getAllPokemons } from "../controllers/pokemon.js";

const { GET } = HTTP_VERBS;

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
];
