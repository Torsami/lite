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


const {email, username, password} = req.body;

pool.query('SELECT * FROM users WHERE (email = $1 OR username = $2)', [email, username], (err, result) => {
    
    if(result.rows.length > 0){
        const db = result.rows[0];
  
        if(db.email === email){
          
            return res.status(400).send({
                success: 'false',     
                message: 'This email is associated with another user'
            }); 
        }

        if(db.username === username){
            return res.status(400).send({
                success: `false`,
                message: `username already taken by another user`
            })
        }
    }else{
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                return err.status(500).send({
                   success: `false`,
                   message: err
                });
            }else{
                pool.query('INSERT INTO users (email, username, password, signupdate) VALUES($1, $2, $3, $4)', 
                [email, username, hash, new Date()], (err, result) => {
                    
                        if(result){
                            return res.status(201).send({
                                success: `true`,
                                message: `New user saved successfully`
                            });
                        }
                });

                }
        })
    }

    })
};

export default signUp;
