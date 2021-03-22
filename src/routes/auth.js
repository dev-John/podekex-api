import { HTTP_CODES, RESPONSE_STATUS, HTTP_VERBS } from "../constants/index.js";

import { verifyUser } from "../controllers/user.js";

const { GET, POST, PUT, DELETE } = HTTP_VERBS;

export default [
  {
    method: POST,
    path: "/verify-otp",

    async handler(req, h) {
      const { userId, answer } = req.payload;

      try {
        const data = await verifyUser(userId, answer);

        return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
      } catch (error) {
        return h
          .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
          .code(HTTP_CODES.FAIL_VALIDATION);
      }
    },
  },
];
