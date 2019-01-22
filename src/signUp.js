import pg from 'pg';
import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

const pool = new pg.Pool({
    user: 'samipostgres',
    host: '127.0.0.1',
    database: 'mydatabase',
    password: 'samipostgres',
    port: '5432'});


const signUp = (req, res) => {


const {email, username, password, verify} = req.body;

pool.query('SELECT * FROM users WHERE (email = $1 OR username = $2)', [email, username], (err, result) => {
    
    if(result.rows.length > 0){
        const db = result.rows[0];

        if(db.username === username){
            return res.status(400).send({
                success: `false`,
                message: `Username already taken by another user`
            })
        }
  
        if(db.email === email){
            return res.status(400).send({
                success: 'false',     
                message: 'Email is associated with another user'
            }); 
        }

    }else{
        if(password !== verify){
            return res.status(400).send({
                success: 'false',     
                message: 'Password does not match'
            }); 
        }
        
        console.log(password, verify);


        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                
                console.log(err)
                return {
                   success: `false`,
                   message: err
                };
            }else{
                pool.query('INSERT INTO users (email, username, password, signupdate) VALUES($1, $2, $3, $4)', 
                [email, username, hash, new Date()], (err, result) => {
                    
                        if(result){

                            return res.status(201).send({
                                success: `true`,
                                message: `Your Signed up was successful`
                            });
                        }
                });

                }
        })
    }

    })
};

export default signUp;
