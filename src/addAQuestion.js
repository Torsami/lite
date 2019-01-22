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

pool.query('SELECT username FROM users WHERE email=$1', [req.userData.email], (err, result)=>{
    const username = result.rows[0].username;

    const newQuestion = {
        username: username,
        question: req.body.questions,
        answers: [],
        time: new Date()
      }
  
      pool.query("INSERT INTO questions (id, username, question, answers, time) VALUES($1, $2, $3, $4, $5)",
      [2, username, newQuestion.question, newQuestion.answers, newQuestion.time], (err, res)=>{ 
      });
  
      return res.status(201).send({
          success: `true`,
          message: `New question added successfully`, 
          question: newQuestion
      })
})
     

}

export default addAQuestion;