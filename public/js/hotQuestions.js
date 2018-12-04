
let uri = 'http://localhost:5000/api/v1/questions';
let h = new Headers();
h.append('Accept', 'application/json')

let req = new Request(uri, {
    method: 'GET',
    headers: h
});


fetch(req)
    .then((res) => res.json())
    .then((data) => {
       data = data.entireQuestionDb;
         let output = `
         <div>
            <strong>Hot Questions <img src="images/question.png" /></strong>
         </div>
            <ul>`

        data.forEach((question) => {
            output += `
            <li>
            <a href="#">
           ${question.question}
            </a>
            </li>`;
        document.getElementById('hotQuestions').innerHTML = output;
        })
    });