const express = require("express");
const cors = require("cors");

require("./db/mongoose");

const { PORT } = require("./config/config");
const userRouter = require("./routers/user");
const redisSession = require("./db/redis");

const app = express();

app.use(cors({}));
app.use(redisSession);
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => console.log(`User service listening on port ${PORT}`));
