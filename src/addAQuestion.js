import db from './db/db';


const addAQuestion = (req, res) => {
    if(!res.status(200)) {
       return res.status(400).send({
            success: 'false',     
            message: 'question is required'
        }); 
     } 

  const newQuestion = {
      id: db.length + 1,
      question: req.body.questions,
      time: new Date(),
      answers: []
    }
    db.push(newQuestion);

    return res.status(201).send({
        success: 'true',
        message: 'New question added successfully', 
        question: newQuestion
    })
}

export default addAQuestion;