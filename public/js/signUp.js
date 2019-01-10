
let uri = 'http://localhost:5000/api/v1/auth/signUp';
let h = new Headers({'content-type': 'application/json'});
let body = {
    username: 'sami',
    email: 'torsami7@gmiail.com',
    password: 'password101'
}


let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});


fetch(req)
    .then((res) => console.log(res))
    .then((data) => {
       console.log(data);
    });