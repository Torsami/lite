import db from './db/db';

const getAllQuestions = (req, res) => {
  res.status(200).send({
  success: 'true',
  message: 'All Questions retrieved successfully',
  entireQuestionDb: db
  });
};

export default getAllQuestions;
