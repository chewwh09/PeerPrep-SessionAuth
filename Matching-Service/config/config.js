const config = {
  PORT: process.env.PORT || 8002,

  DB_CLOUD_URI: process.env.DB_CLOUD_URI,
  DB_LOCAL_URI: `mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@${process.env.MONGO_IP || "mongo"}:${
    process.env.MONGO_PORT || 27017
  }/?authSource=admin`,

  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,

  ACTIVE_MQ_ENDPOINT: process.env.ACTIVE_MQ_ENDPOINT || "http://activemq:1883",
  ACTIVE_MQ_USERNAME: process.env.ACTIVE_MQ_USERNAME || "admin",
  ACTIVE_MQ_PASSWORD: process.env.ACTIVE_MQ_PASSWORD || "admin",
  ACTIVE_MQ_PORT: process.env.ACTIVE_MQ_PORT || 1883,
};

module.exports = config;
