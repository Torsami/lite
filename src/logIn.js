import {User} from './user';

const logIn = (req, res, next) => {
    const user = new User (req.body.email, req.body.password);
    user
        .check()
        .then(userProfile => {
            if(!userProfile){
                return res.status(404).json({
                    message: 'Invalid email or password'
                });
            }else{
                bcrypt.compare(password, userProfile[0].password, (err, result) => {
                    if(err){
                        return res.status(404).json({
                            message: 'Invalid email or password'
                        });
                    }
                    if(result){
                        const token = jwt.sign({
                            email: userProfile[0].email,
                            username: userProfile[0].username
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
