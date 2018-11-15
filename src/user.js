
class user{

    check(){
        pg.connect(connect, (err, client, done) => {
            if(err){
                return res.status(500).json({
                    error: err
                });
            }
            client.query('SELECT email, password FROM database WHERE email = $1', [email], function (err, userReport){
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                done()
            })
        })
    }

    save(){
        pg.connect(connect, (err, client, done) => {
            if(err){
                console.log(err);
                return 'error connecting to database';
            }
            client.query('INSERT INTO database (email, username, password) VALUES($1, $2, $3)', 
                        [this.email, this.username, this.hash]);
                done();
            });
        };
}

export {user};