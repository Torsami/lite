import pg from 'pg';
import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

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

const logIn = (req, res, next) => {

    const {email, password} = (req.body);

    pool.query('SELECT password FROM users WHERE (email = $1)', [email], (err, result) => {

            if(result.rows.length > 0){
            
                bcrypt.compare(password, result.rows[0].password, (err, response) => {
                    if(err){
                        return res.status(404).json({
                            success: `false`,
                            message: `Invalid email or password`
                        });
                    }
                    if(response){
                        const token = jwt.sign({
                            email: email,
                            password: result.rows[0].password
                        }, 
                        `secret`,
                        {
                            expiresIn: `1h`
                        });
                    
                    return res.status(200).json({
                            success: `true`,
                            message: `Auth successful`,
                            token
                        });
                    }else{
                        return res.status(404).json({
                        success: `false`,
                        message: `Invalid email or password`
                    });
                }
                })
            }else{
                return res.status(404).json({
                success: `false`,
                message: `Invalid email or password`
            });
        }
          
        })
        

}

export default logIn;
