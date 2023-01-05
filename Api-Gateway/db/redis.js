const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("../config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const redisSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 300000,
  },
});

module.exports = redisSession;
