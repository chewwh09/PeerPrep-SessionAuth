const Question = require("./question-orm");
const data = require("../utils/data.json");

const populateQuestionIntoDb = async () => {
  const filteredData = data.map((record) => {
    return {
      questionId: record.question_id,
      questionDifficulty: record.question_difficulty,
      questionTitle: record.question_title,
      questionContent: record.question_content,
    };
  });
  await Question.insertMany(filteredData);
  return;
};

const getRandomQuestion = async (difficulty) => {
  const filteredQuestions = await Question.filterQuestion(difficulty);
  const numOfFilteredQuestions = filteredQuestions.length;
  return filteredQuestions[
    Math.floor(Math.random() * numOfFilteredQuestions).toString()
  ];
};

module.exports = { populateQuestionIntoDb, getRandomQuestion };
