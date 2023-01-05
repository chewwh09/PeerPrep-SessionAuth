const express = require("express");

const authenticate = require("../middleware/auth");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const { deleteMatchRecord } = require("../models/matching-repository");

const router = new express.Router();

router.delete("/matching", authenticate, async (req, res) => {
  try {
    const data = await deleteMatchRecord(req.body);
    res.json({
      statusCode: STATUS_CODE[200],
      message: RESPONSE_MESSAGE.DELETE_USER_SUCCESS,
      data,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.DELETE_USER_FAILURE,
    });
  }
});

module.exports = router;
