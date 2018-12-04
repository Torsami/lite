import User from './user';

const signUp = (req, res, next) => {
    const user = new User (req.body.username, req.body.email);

    user
        .check()
        .then(userProfile => {
            res.status(403).json({
                message: 'User already exist'
            });
        })
        

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }else{

            user.password = hash;
            user
            .save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created'
                })
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })

        }
    })
}

export default signUp;