const config = {
  PORT: process.env.PORT || "8000",

  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,

  ACTIVE_MQ_ENDPOINT: process.env.ACTIVE_MQ_ENDPOINT || "http://activemq:1883",
  ACTIVE_MQ_USERNAME: process.env.ACTIVE_MQ_USERNAME || "admin",
  ACTIVE_MQ_PASSWORD: process.env.ACTIVE_MQ_PASSWORD || "admin",
  ACTIVE_MQ_PORT: process.env.ACTIVE_MQ_PORT || 1883,

  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://localhost:8001",
  MATCHING_SERVICE_URL:
    process.env.MATCHING_SERVICE_URL || "http://localhost:8002",
  QUESTION_SERVICE_URL:
    process.env.QUESTION_SERVICE_URL || "http://localhost:8003",
  HISTORY_SERVICE_URL:
    process.env.HISTORY_SERVICE_URL || "http://localhost:8004",
};

module.exports = config;
