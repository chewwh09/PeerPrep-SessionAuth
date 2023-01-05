const express = require("express");
const cors = require("cors");

require("./db/mongoose");
require("./activemq/messageQueue");

const { PORT } = require("./config/config");
const redisSession = require("./db/redis");
const matchingRouter = require("./routers/matching");

const app = new express();

app.use(cors({}));
app.use(redisSession);
app.use(express.json());
app.use(matchingRouter);

app.listen(PORT, () =>
  console.log(`Matching-Service is listening on port ${PORT}`)
);
