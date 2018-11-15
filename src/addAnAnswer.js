import db from './db/db';


const addAnAnswer = (req, res) => {

    const id = parseInt(req.params.questionId, 10);
    db.map((question) => {
        if(question.id === id){
            const newAnswer = {
                id: question.answers.length + 1,
                user: req.body.user,
                answer: req.body.answers,
                upVotes: [],
                downVotes:[],
                reply: []
              };

            question.answers.push(newAnswer);
            
            return res.status(201).send({
            status: 'New Answer added successfully', 
            answers: question.answers
            })
        }
       
    })
}

export default addAnAnswer;