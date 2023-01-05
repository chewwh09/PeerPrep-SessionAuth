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
  CREATE_SUCCESS: "User has successfully been created an account.",
  CREATE_FAILED: "User are unable to register for an account.",

  LOGIN_SUCCESS: "User has successfully login.",
  LOGIN_FAILURE: "User has failed to login.",

  LOGOUT_SUCCESS: "User has successfully logout.",
  LOGOUT_FAILURE: "User has failed to logout.",

  READ_USER_PROFILE: "User has successfully retrieve his profile",

  UPDATE_USER_SUCCESS: "User has successfully update his user profile.",
  UPDATE_USER_FAILURE: "User has failed to update his user profile.",

  DELETE_USER_SUCCESS: "User has successfully deleted his account.",
  DELETE_USER_FAILURE: "User has failed to delete his account.",

  UNATHENTICATED: "Please authenticate.",
};

module.exports = { STATUS_CODE, RESPONSE_MESSAGE };
