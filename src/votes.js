import user from './user';

const pool = user.pool;




const voteDown = (req, res) => {
    const id = parseInt(req.params.questionId, 10);
    const answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], (err, result)=>{
    if(result){
        let theAnswer = JSON.parse(result.rows[0].answers[answer]);

        let opposition;
        let checker = theAnswer.upVotes.indexOf(req.body.username);
        if(checker > -1){
            theAnswer.upVotes.splice(checker, 1);
            opposition =  theAnswer.upVotes.length;
          }

        checker = theAnswer.downVotes.indexOf(req.body.username);
        if(checker === -1){
            theAnswer.downVotes.push(req.body.username);
        }else{
            res.status(201).send({
                success: `false`,
                message: `Casted vote reversed successfully`, 
                opposition: opposition,
                ansTotVotes: theAnswer.downVotes.length - 1
            })
        }
        

        result.rows[0].answers[answer] = theAnswer;


        pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [result.rows[0].answers, id], (error, resp) => {
            
            if(resp){
                    res.status(201).send({
                        success: `true`,
                        message: `Vote casted successfully`, 
                        opposition: opposition,
                        ansTotVotes: theAnswer.downVotes.length

                    })

                }
            })
        }
})
}


const voteUp = (req, res) => {
    const id = parseInt(req.params.questionId, 10);
    const answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], (err, result)=>{
    if(result){
        let theAnswer = JSON.parse(result.rows[0].answers[answer]);

        let opposition;
        let checker = theAnswer.downVotes.indexOf(req.body.username);
        if(checker > -1){
            theAnswer.downVotes.splice(checker, 1);
            opposition =  theAnswer.downVotes.length;
          }

        checker = theAnswer.upVotes.indexOf(req.body.username);
        if(checker === -1){
            theAnswer.upVotes.push(req.body.username);
        }else{
            res.status(201).send({
                success: `false`,
                message: `Casted vote reversed successfully`, 
                opposition: opposition,
                ansTotVotes: theAnswer.upVotes.length - 1
            })
        }
        

        result.rows[0].answers[answer] = theAnswer;


        pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [result.rows[0].answers, id], (error, resp) => {
            
            if(resp){
                    res.status(201).send({
                        success: `true`,
                        message: `Vote casted successfully`, 
                        opposition: opposition,
                        ansTotVotes: theAnswer.upVotes.length


                    })

                }
            })
        }
})
}

export default {voteDown, voteUp};