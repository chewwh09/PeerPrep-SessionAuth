const express = require("express");
const cors = require("cors");
const http = require("http");

const { PORT } = require("./config/config");
const redisSession = require("./db/redis");
const userRouter = require("./routers/user");
const historyRouter = require("./routers/history");
const initiateSocket = require("./socket/socketio");

const app = new express();
const server = http.createServer(app);

app.use(cors({}));
app.use(redisSession);
app.use(express.json());
app.use(userRouter);
app.use(historyRouter);

initiateSocket(server);

server.listen(PORT, () =>
  console.log(`Api-Gateway is listening on port ${PORT}`)
);
