
let uri = 'http://localhost:5000/api/v1/auth/logIn';
let h = new Headers();
h.append('Accept', 'application/json')

let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify({
        userName: 'sami',
        email: 'torsami77@gmail.com',
        password: 'luckshembell10'
    })
});


fetch(req)
    .then((res) => console.log(res))
    .then((data) => {
       console.log(data);
    });