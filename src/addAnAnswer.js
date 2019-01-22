import db from './db/db';
import user from './user';

const pool = user.pool;


const addAnAnswer = (req, res) => {
    pool.query('SELECT username FROM users WHERE email=$1', [req.userData.email], (err, result)=>{
    const username = result.rows[0].username;

    const id = parseInt(req.params.questionId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], (err, result)=>{
    const answersArray = result.rows[0].answers;

        if(result){
            const newAnswer = {
                id: answersArray.length + 1,
                user: username,
                answer: req.body.answer,
                upVotes: [],
                downVotes:[],
                reply: []
              };

              answersArray.push(newAnswer);

              pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [answersArray, id], (error, results) => {
            
              if(result){
                return res.status(201).send({
                    success: 'true',
                    message: 'New Answer added successfully', 
                    answers: newAnswer
                    })
              }else{
                return res.status(401).send({
                    success: `false`,
                    message: `An error occured, please try again`
                })
              }
            })
        }

       
    })
    })
    
}

export default addAnAnswer;