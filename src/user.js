import pg from 'pg';
export class User{

    constructor(email, username, password){
        this.email = email;
        this.username = username;
        this.hash = password;
        }

    check(){
        pg.connect(connect, (err, client, done) => {
            if(err){
                return res.status(500).json({
                    error: err
                });
            }
            client.query('SELECT * FROM database WHERE email = $1', [this.email], (err, userProfile) => {
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

// User;