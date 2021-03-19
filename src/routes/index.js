import pokemon from "./pokemon.js";

export default [
  ...pokemon,
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Erro 404, a pagina solicitada não existe",
  },
];
