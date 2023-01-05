const express = require("express");

const {
  registerNewUser,
  loginUser,
  updateProfile,
  deleteUser,
} = require("../models/user-repository");
const authenticate = require("../middleware/auth");
const { STATUS_CODE, RESPONSE_MESSAGE } = require("../utils/constants");

const router = new express.Router();

router.post("/users/signup", async (req, res) => {
  try {
    const user = await registerNewUser(req.body);
    req.session.user = user;

    res.status(201).json({
      statusCode: STATUS_CODE[201],
      responseMessage: RESPONSE_MESSAGE.CREATE_SUCCESS,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      responseMessage: RESPONSE_MESSAGE.CREATE_FAILED,
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await loginUser(req.body);
    req.session.user = user;

    res.status(200).json({
      statusCode: STATUS_CODE[200],
      responseMessage: RESPONSE_MESSAGE.LOGIN_SUCCESS,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      responseMessage: RESPONSE_MESSAGE.LOGIN_FAILURE,
    });
  }
});

router.post("/users/logout", authenticate, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({
          statusCode: STATUS_CODE[400],
          responseMessage: RESPONSE_MESSAGE.LOGOUT_FAILURE,
        });
      } else {
        res.status(200).json({
          statusCode: STATUS_CODE[200],
          responseMessage: RESPONSE_MESSAGE.LOGOUT_SUCCESS,
        });
      }
    });
  } else {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      responseMessage: RESPONSE_MESSAGE.LOGOUT_FAILURE,
    });
  }
});

router.get("/users/me", authenticate, (req, res) => {
  res.status(200).json({
    statusCode: STATUS_CODE[200],
    responseMessage: RESPONSE_MESSAGE.READ_USER_PROFILE,
    data: req.user,
  });
});

router.patch("/users/me", authenticate, async (req, res) => {
  try {
    const user = await updateProfile(req.body, req.user);
    res.status(200).json({
      statusCode: STATUS_CODE[200],
      responseMessage: RESPONSE_MESSAGE.UPDATE_USER_SUCCESS,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      responseMessage: RESPONSE_MESSAGE.UPDATE_USER_FAILURE,
    });
  }
});

router.delete("/users/me", authenticate, async (req, res) => {
  try {
    const user = await deleteUser(req.user);
    req.session.destroy();
    res.status(200).json({
      statusCode: STATUS_CODE[200],
      responseMessage: RESPONSE_MESSAGE.DELETE_USER_SUCCESS,
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: STATUS_CODE[400],
      responseMessage: RESPONSE_MESSAGE.DELETE_USER_FAILURE,
    });
  }
});

module.exports = router;
