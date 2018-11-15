import express from 'express';
import getAllQuestions from './getAllQuestions';
import getAQuestion from './getAQuestion';
import addAQuestion from './addAQuestion';
import addAnAnswer from './addAnAnswer';
import signUp from './signUp';
import logIn from './logIn';
//import {voteDown, voteUp} from './votes';
import db from './db/db';
import user from './user';
import bodyParser from 'body-parser';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';

const app = express();
const connect = "postgres://postlite:password101@localhost/postgres";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(express.static("public"));


app.get('/', (req, res)=>{
  res.sendFile(path.resolve('./public/index.html'));
})
app.get('/api/v1/questions', getAllQuestions);
app.get('/api/v1/questions/:questionId', getAQuestion);
app.post('/api/v1/questions/', addAQuestion);
app.post('/api/v1/questions/:questionId/answers', addAnAnswer);
app.post('/api/v1/auth/signup', signUp);
app.post('/api/v1/auth/login', logIn);
//app.post('/api/v1/votedown/:questionId/answerId', voteDown);
//app.post('/api/v1/voteup/:questionId/answerId', voteUp);
//app.post('/api/v1/choosenanswer/:questionId/answerId', choosenAnswer);

const PORT = 5000;

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    });

export {app};
