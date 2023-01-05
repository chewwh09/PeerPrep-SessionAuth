const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const { PORT } = require("./config/config");
const redisSession = require("./db/redis");
const historyRouter = require("./routers/history");

const app = new express();

app.use(cors({}));
app.use(redisSession);
app.use(express.json());
app.use(historyRouter);

app.listen(PORT, () =>
  console.log(`History service is listening on port ${PORT}`)
);
