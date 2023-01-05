const TOPICS = {
  FIND_MATCH_TOPIC: "/topic/findMatch",
  FIND_MATCH_REPLY_TOPIC: "/topic/findMatchReply",
};

const STATUS_CODE = {
  200: "200 OK",
  201: "201 Created",
  202: "202 Accepted",
  400: "400 Bad Request",
  401: "401 Unauthorized",
  403: "403 Forbidden",
  405: "405 Method Now Allowed",
  500: "500 Internal Server Error",
  501: "501 Not Implemented",
  502: "502 Bad Gateway",
};

const RESPONSE_MESSAGE = {
  DELETE_USER_SUCCESS: "The matching has successfully been deleted.",
  DELETE_USER_FAILURE: "The matching has failed to delete his account.",
};

module.exports = { TOPICS, STATUS_CODE, RESPONSE_MESSAGE };
