import fetch from 'isomorphic-fetch';

let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(req.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

let uri = 'http://localhost:5000/api/v1/auth/logIn';
//let h = new Headers({'content-type': 'application/json'});
let body = {
    email: 'sam@gmail.com',
    password: 'mmmmmmmm',
}



fetch(uri, {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body:JSON.stringify(body)
})
    .then((resp) => resp.json())
    .then((data) => {
    
        if(data.success === 'true'){
          console.log('surely')
        }
    })
    
const token = getCookie('token');


export default {getCookie, token};
