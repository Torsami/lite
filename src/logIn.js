
const logIn = (req, res, next) => {
    const user = new User ({
        email: req.body.email,
        pass: req.body.password
    });

    user
        .check()
        .then(userReport => {
            if(!userReport){
                return res.status(404).json({
                    message: 'Invalid email or password'
                });
            }else{
                bcrypt.compare(password, userReport[0].password, (err, result) => {
                    if(err){
                        return res.status(404).json({
                            message: 'Invalid email or password'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            email: userReport[0].email,
                            username: userReport[0].username
                        }, 
                        secret,
                        {
                            expiresIn: '1h'
                        });
                    
                    return res.status(200).json({
                            message: 'Auth successful',
                            token
                        });
                    }
                })
            }
          
        })
        


}

export default logIn;
