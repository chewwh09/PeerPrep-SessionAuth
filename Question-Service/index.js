const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const { PORT } = require("./config/config");
const questionRouter = require("./routers/question");
const redisSession = require("./db/redis");

const app = new express();

app.use(cors({}));
app.use(redisSession);
app.use(express.json());
app.use(questionRouter);

app.listen(PORT, () => console.log("Question service listening on port", PORT));
