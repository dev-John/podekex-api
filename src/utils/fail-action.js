import { HTTP_CODES, RESPONSE_STATUS } from '../constants/index.js';

export default function failAction(request, h, error) {
  return h
    .response({
      status: RESPONSE_STATUS.ERROR,
      message: error.output.payload.message,
    })
    .code(HTTP_CODES.BAD_REQUEST)
    .takeover();
}
