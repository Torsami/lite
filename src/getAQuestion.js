import db from './db/db';
import user from './user';

const pool = user.pool;


const getAQuestion = (req, res) => {
    const id = parseInt(req.params.questionId, 10);

    pool.query('SELECT * FROM questions WHERE id=$1', [id], (err, result)=>{
       
        if(result){
            const questionResult = {
                id: result.rows[0].id,
                username: result.rows[0].username,
                question: result.rows[0].question,
                time: result.rows[0].time,
                answers: result.rows[0].answers
            }

            return res.status(200).send({
                success: `true`,
                message: `Task completed successfully`,
                questionData: questionResult
        })
    }else{
        return res.status(404).send({
            success: `false`,
            message: `Task not completed, no question found with specified id`
        })
    }
    })

   

}

    

export default getAQuestion;