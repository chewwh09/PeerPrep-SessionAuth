const express = require("express");
const axios = require("axios");

const { authenticate } = require("../middleware/auth");
const {
  LOGIN_USER_URL,
  SIGNUP_USER_URL,
  USER_URL,
} = require("../routes/routes");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");

const router = new express.Router();

router.post("/users/signup", async (req, res) => {
  try {
    const response = await axios.post(LOGIN_USER_URL, req.body);
    req.session.user = response.data.data;
    res.status(201).json(response.data);
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.CREATE_FAILED,
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const response = await axios.post(SIGNUP_USER_URL, req.body);
    req.session.user = response.data.data;
    res.json(response.data);
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.LOGIN_FAILURE,
    });
  }
});

router.get("/users/me", authenticate, async (req, res) => {
  try {
    const response = await axios.get(USER_URL, {
      headers: req.headers,
    });
    res.json(response.data);
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.READ_USER_PROFILE_FAILURE,
    });
  }
});

router.patch("/users/me", authenticate, async (req, res) => {
  try {
    const response = await axios.patch(USER_URL, req.body, {
      headers: { cookie: `${req.headers.cookie}` },
    });
    req.session.user = response.data.data;
    res.json(response.data);
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.UPDATE_USER_FAILURE,
    });
  }
});

router.delete("/users/me", authenticate, async (req, res) => {
  try {
    const response = await axios.delete(USER_URL, {
      headers: req.headers,
    });
    req.session.destroy();
    res.json(response.data);
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      message: RESPONSE_MESSAGE.DELETE_USER_FAILURE,
    });
  }
});

module.exports = router;
