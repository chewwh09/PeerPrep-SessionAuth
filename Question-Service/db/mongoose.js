const mongoose = require("mongoose");

const config = require("../config/config");

mongoose.connect(config.DB_CLOUD_URI || config.DB_LOCAL_URI, {
  useNewUrlParser: true,
});
