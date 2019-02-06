import db from './db/db';
import user from './user';



const pool = user.pool;


const addAQuestion = (req, res) => {
    if(!res.status(200)) {
       return res.status(400).send({
            success: `false`,     
            message: `question is required`
        }); 
     } 


    const newQuestion = {
        username: req.cookies.userData.username,
        question: req.body.questions,
        answers: [],
        time: new Date()
      }
  
      pool.query("INSERT INTO questions (username, question, answers, time) VALUES($1, $2, $3, $4)",
      [newQuestion.username, newQuestion.question, newQuestion.answers, newQuestion.time], (err, res)=>{ 
    });
  

      return res.status(201).send({
          success: `true`,
          message: `New question added successfully`, 
          question: newQuestion
      })
     

}

export default addAQuestion;