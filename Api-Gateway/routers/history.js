const express = require("express");
const axios = require("axios");

const { authenticate } = require("../middleware/auth");
const { USER_HISTORY_URL } = require("../routes/routes");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");

const router = new express.Router();

router.get("/history/:username", authenticate, async (req, res) => {
  try {
    const response = await axios.get(`${USER_HISTORY_URL}/:username`, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({
      statusCode: STATUS_CODE[500],
      message: RESPONSE_MESSAGE.READ_USER_HISTORIES_FAILED,
    });
  }
});

module.exports = router;
