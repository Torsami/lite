import db from './db/db';

const getAllQuestions = (req, res) => {
  res.status(200).send({
  status: 'All Questions retrieved successfully',
  entireQuestionDb: db
  });
};

export default getAllQuestions;
