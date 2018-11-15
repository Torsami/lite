
import db from './db/db';


const getAQuestion = (req, res) => {
    const id = parseInt(req.params.questionId, 10);
    db.map((question) => {
        if(question.id === id){
            return res.status(200).send({
               status: 'Task completed successfully',
               questionData: question
            });
        }
    })
    return res.status(404).send({
        error: `Task not completed, no question found with specified id`
    })

}

    

export default getAQuestion;