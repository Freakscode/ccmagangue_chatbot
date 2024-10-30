const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const loadQuestions = () => {
  const data = fs.readFileSync('./questions.json');
  return JSON.parse(data).Q&A;
};

const getAnswer = (question, questionsList) => {
  const q = questionsList.find(q => q.pregunta.toLowerCase() === question.toLowerCase());
  return q ? q.respuesta : "Lo siento, no tengo una respuesta para esa pregunta.";
};

app.post('/ask', (req, res) => {
  const question = req.body.question;
  const questionsList = loadQuestions();
  const answer = getAnswer(question, questionsList);
  res.json({ answer });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});