import pokemon from "./pokemon.js";
import user from "./user.js";
import auth from "./auth.js";

export default [
  ...pokemon,
  ...user,
  ...auth,
  {
    method: "*",
    path: "/",
    handler: () => "Welcome to the Pokedex-API",
  },
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Erro 404, a pagina solicitada não existe",
  },
];
