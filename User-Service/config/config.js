const config = {
  PORT: process.env.PORT || 8001,

  DB_CLOUD_URI: process.env.DB_CLOUD_URI,
  DB_LOCAL_URI: `mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@${process.env.MONGO_IP || "mongo"}:${
    process.env.MONGO_PORT || 27017
  }/?authSource=admin`,

  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

module.exports = config;
