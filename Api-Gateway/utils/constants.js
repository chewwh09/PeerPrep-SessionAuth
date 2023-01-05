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
  // AUTHENTICATION
  UNATHENTICATED: "Please authenticate.",

  // USER SERVICE
  CREATE_FAILED: "User are unable to register for an account.",
  LOGIN_FAILURE: "User has failed to login.",
  LOGOUT_FAILURE: "User has failed to logout.",
  READ_USER_PROFILE_FAILURE: "User has failed to retrieve his profile",
  UPDATE_USER_FAILURE: "User has failed to update his user profile.",
  DELETE_USER_FAILURE: "User has failed to delete his account.",

  // HISTORY SERVICE
  READ_USER_HISTORIES_FAILED: "User history has failed to be retrieved.",
};

const SOCKET_EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  WAITING_ROOMS: "waitingRoom",
  FIND_MATCH: "findMatch",
  MATCH_FOUND: "matchFound",
  TIMEOUT: "timeout",
  JOIN_ROOM: "joinRoom",
  GET_QUESTION: "getQuestion",
  UPDATE_QUESTION: "updateQuestion",
  CODE: "code",
  UPDATE_CODE: "updateCode",
  LEAVE_ROOM: "leaveRoom",
  PARTNER_LEAVE_ROOM: "partnerLeftTheRoom",
};

const TOPICS = {
  FIND_MATCH_TOPIC: "/topic/findMatch",
  FIND_MATCH_REPLY_TOPIC: "/topic/findMatchReply",
};

module.exports = { STATUS_CODE, RESPONSE_MESSAGE, SOCKET_EVENTS, TOPICS };
