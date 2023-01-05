const config = require("../config/config");

const routes = {
  // USER SERVICE
  LOGIN_USER_URL: `${config.USER_SERVICE_URL}/users/signup`,
  SIGNUP_USER_URL: `${config.USER_SERVICE_URL}/users/login`,
  USER_URL: `${config.USER_SERVICE_URL}/users/me`,

  // MATCHING SERVICE
  MATCHING_URL: `${config.MATCHING_SERVICE_URL}/matching`,

  // QUESTION SERVICE
  GET_RANDOM_QUESTION_URL: `${config.QUESTION_SERVICE_URL}/questions/getQuestion`,

  // HISTORY SERVICE
  USER_HISTORY_URL: `${config.HISTORY_SERVICE_URL}/history`,
};

module.exports = routes;
