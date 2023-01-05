const express = require("express");

const authenticate = require("../middleware/auth");
const {
  populateQuestionIntoDb,
  getRandomQuestion,
} = require("../models/question-repository");

const router = new express.Router();

router.get("/questions/getLeetcodeQuestions", async (req, res, next) => {
  try {
    await populateQuestionIntoDb();
    res.send({ message: "Successfully populate database with questions" });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get(
  "/questions/getQuestion/:difficulty",
  authenticate,
  async (req, res) => {
    try {
      const difficultyStr = req.params.difficulty;
      if (!difficultyStr) throw new Error();

      const capitalizeString =
        difficultyStr.charAt(0).toUpperCase() + difficultyStr.slice(1);
      const question = await getRandomQuestion(capitalizeString);
      res.send(question);
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  }
);

module.exports = router;
