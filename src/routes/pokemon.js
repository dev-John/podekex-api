import { HTTP_CODES, RESPONSE_STATUS, HTTP_VERBS } from "../constants/index.js";
import {
  createPokemon,
  deletePokemon,
  getPokemonByName,
  getPokemons,
  updatePokemon,
} from "../controllers/pokemon.js";

const { GET, POST, PUT, DELETE } = HTTP_VERBS;

export default [
  {
    method: GET,
    path: "/get-pokemons",

    async handler(req, h) {
      const { page, rowsPerPage } = req.query;

      try {
        const data = await getPokemons({ page, rowsPerPage });

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: GET,
    path: "/get-pokemon-by-name",

    async handler(req, h) {
      const { name } = req.query;

      try {
        const data = await getPokemonByName(name);

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
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
      const { pokemon } = req.payload;

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

  {
    method: DELETE,
    path: "/delete-pokemon/{_id}",

    async handler(req, h) {
      const { _id } = req.params;

      try {
        await deletePokemon(_id);

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: PUT,
    path: "/update-pokemon",

    async handler(req, h) {
      const { pokemon } = req.payload;

      try {
        await updatePokemon(pokemon);

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
