const express = require("express");

const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");
const {
  getUserHistory,
  saveUserHistory,
} = require("../models/history-repository");
const authenticate = require("../middleware/auth");

const router = new express.Router();

router.post("/history", authenticate, async (req, res) => {
  try {
    const data = req.body;
    const userOneHistory = await saveUserHistory(
      data.usernameOne,
      data.questionDifficulty,
      data.questionTitle,
      data.questionContent
    );
    const userTwoHistory = await saveUserHistory(
      data.usernameTwo,
      data.questionDifficulty,
      data.questionTitle,
      data.questionContent
    );
    res.status(201).json({
      statusCode: STATUS_CODE[201],
      message: RESPONSE_MESSAGE.CREATE_SUCCESS,
      data: [userOneHistory, userTwoHistory],
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      statusCode: STATUS_CODE[500],
      message: RESPONSE_MESSAGE.CREATE_FAILED,
    });
  }
});

router.get("/history/:username", authenticate, async (req, res) => {
  try {
    const userHistory = await getUserHistory(req.params.username);
    res.json({
      statusCode: STATUS_CODE[200],
      message: RESPONSE_MESSAGE.READ_USER_HISTORIES_SUCCESS,
      data: userHistory,
    });
  } catch (e) {
    res.status(500).json({
      status: STATUS_CODE[500],
      message: RESPONSE_MESSAGE.READ_USER_HISTORIES_FAILED,
    });
  }
});

module.exports = router;
