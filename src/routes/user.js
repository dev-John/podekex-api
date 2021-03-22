import { HTTP_CODES, RESPONSE_STATUS, HTTP_VERBS } from "../constants/index.js";
import { login, signup } from "../controllers/user.js";

const { POST } = HTTP_VERBS;

export default [
  {
    method: POST,
    path: "/signup",

    async handler(req, h) {
      const { name, email, password } = req.payload;

      try {
        await signup({ name, email, password });

        return h.response({ status: RESPONSE_STATUS.SUCCESS });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },

  {
    method: POST,
    path: "/login",

    async handler(req, h) {
      const { email, password } = req.payload;

      try {
        const data = await login({ email, password });

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
