let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
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

const token = getCookie('token');
const username = getCookie('username');
const ansContributed = getCookie('answers');

    let uri = 'http://localhost:5000/api/v1/questions';
    let h = new Headers({'content-type': 'application/json'});
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
    });

    fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
           
            if(typeof(data.userData) === 'undefined'){
                window.location.replace("index.html");
            }else{
                        
                let asked = 0;

                let allQuestions = `<div>
                                        <h2>Overflowing Questions</h2>
                                    </div>`;
               
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                    asked ++;}

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p id="answers${each.id}"><p>${each.answers.length}</br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
								<p id="votes${each.id}"><p>${totalVotes}</br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
								<p id="views${each.id}"><p>100</br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
						</div>
					</div>
                    <div class="cursor" onClick="showAnswers(${each.id})">
                        <strong>${each.username}</strong>
						<p id="q1">
							----- ${each.question} 
						</p>
						<p class="timing-details">
								1 minute ago
						</p>
                    </div>
                    <div id="answersDiv${each.id}">
                    </div>
                </div>`;
                }); 

                document.getElementById('interactions').innerHTML = allQuestions;
    
                const profile = `<p><h2>${username}<br/><img src="images/menu.png"/></h2></p>
                <h2>Questions Asked: ${asked}!</br>Answers contributed: ${ansContributed}!</h2>`;
    
                document.getElementById('profile').innerHTML = profile;
            }  
        })





let postQuestion = () => {
    let postedQ = document.getElementById('postQuestion').value;
    
    if(postedQ.replace(/[^0-9A-Za-z\,]/g, "") === ''){
        document.getElementById('info').innerHTML = `<p class="false" id="status">Field can't be left empty</p>`;
        document.getElementById('postQuestion').focus();
    }else{


let bearer = `Bearer ${token}`;


let uri = 'http://localhost:5000/api/v1/questions';
let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
let body = {
    questions: postedQ
}

let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});

fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
            if(data.success === 'false'){
                alert('Your login session has expired, you will need to login again')
                window.location.replace("index.html");
            }else{
                document.getElementById('info').innerHTML = `<p class="true" >${data.message}</p>`;
            }
           })


    }

}

let showAnswers = (questionId) => {
    
    if(document.getElementById(`answersDiv${questionId}`).innerHTML.replace(/[^0-9A-Za-z\,]/g, "") === ''){

    let uri = `http://localhost:5000/api/v1/questions/${questionId}`;
    let h = new Headers({'content-type': 'application/json'});
 
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                let allAnswers = '<div class="ques-with-ans">';
                let ans;
                let answersArray;

                if(data.questionData.answers.length === 1){
                    
                         ans = JSON.parse(data.questionData.answers);
                         let thumpsDown = 'downvote.jpg';
                         let thumpsUp = 'upvote.jpg';
                         if(ans.upVotes.includes(username)){
                             thumpsUp = 'upvoted.jpg';
                         }
                         if(ans.downVotes.includes(username)){
                             thumpsDown = 'downvoted.jpg';
                         }
    
                        allAnswers += `
                        <div class="ans-for-ques">
                        <div>
                        <p>
                        <strong>${ans.user}</strong>
                        </p>
                        </div>
                        <p id="answerId0">
                        ${ans.answer}
                        </p>
                        <div>
        
                        <div class="answer-status">1 hour ago</div> 
                        <div class="answer-status" id="down${questionId,0}" onClick="voteDown(${questionId}, 0)">
                        <img  class="icons" src="images/${thumpsDown}"/></br>${ans.downVotes.length}
                        </div>
                        <div class="answer-status" id="up${questionId,0}" onClick="voteUp(${questionId}, 0)">
                        <img  class="icons" src="images/${thumpsUp}"/></br>${ans.upVotes.length}
                        </div>
        
                        </p>
                        </div>
                        </div>
                `;

                }else if(data.questionData.answers.length > 1){
                    let i = 0;
                    answersArray = data.questionData.answers;
                    answersArray.forEach(ansToParse => {
                    
                        ans = JSON.parse(ansToParse);
                       
                        let thumpsDown = 'downvote.jpg';
                        let thumpsUp = 'upvote.jpg';
                        if(ans.upVotes.includes(username)){
                            thumpsUp = 'upvoted.jpg';
                        }
                        if(ans.downVotes.includes(username)){
                            thumpsDown = 'downvoted.jpg';
                        }


                        allAnswers += `
                        <div class="ans-for-ques">
                        <div>
                        <p>
                        <strong>${ans.user}</strong>
                        </p>
                        </div>
                        <p id="answerId${ansToParse[i]}">
                        ${ans.answer}
                        </p>
                        <div>
        
                        <div class="answer-status">1 hour ago</div> 
                        <div class="answer-status" id="down${questionId,i}" onClick="voteDown(${questionId}, ${i})">
                        <img  class="icons" src="images/${thumpsDown}"/></br>${ans.downVotes.length}
                        </div>
                        <div class="answer-status" id="up${questionId,i}" onClick="voteUp(${questionId}, ${i})">
                        <img  class="icons" src="images/${thumpsUp}"/></br>${ans.upVotes.length}
                        </div>
        
                        </p>
                        </div>
                        </div>
                `;
                i++;
                    });
                    
                }

                

    document.getElementById(`answersDiv${questionId}`).innerHTML = `${allAnswers}
    <div class="justify">
    <div id="info${questionId}"></div>
        <p>
        <textarea id="comment${questionId}" rows="10" cols="40" placeholder="Add comment to this thread..." required></textarea>
        </p>
        <button onClick="addComment(${questionId})">Add comment</button>
        </form>
    </div></div>
    `
            })

        }else{
            document.getElementById(`answersDiv${questionId}`).innerHTML = '';
        }
}




let addComment = (qId) => {
    let newComment = document.getElementById(`comment${qId}`).value;

    if(newComment.replace(/[^0-9A-Za-z\,]/g, "") === ''){
        document.getElementById(`info${qId}`).innerHTML = `<p class="false" id="status">Field can't be left empty</p>`;
        document.getElementById(`comment${qId}`).focus();
    }else{


let bearer = `Bearer ${token}`;


let uri = `http://localhost:5000/api/v1/questions/${qId}/answers`;
let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
let body = {
    username: username,
    answer: newComment
}

let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});

fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
            if(data.success === 'false'){
                alert('Your login session has expired, you will need to login again')
                window.location.replace("index.html");
            }else{
                document.getElementById(`info${qId}`).innerHTML = `<p class="true" >${data.message}</p>`;
            }
           })
    }
}



let voteDown = (qId, aId) => {
    
    let bearer = `Bearer ${token}`;
    
    
    let uri = `http://localhost:5000/api/v1/voteDown/${qId}/${aId}`;
    let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
    let body = {
        username: username
    }
    
    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body:JSON.stringify(body)
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                if(data.success === `true`){
                    
            document.getElementById(`down${qId,aId}`).innerHTML = `
            <img  class="icons" src="images/downvoted.jpg"/></br>${data.ansTotVotes}`;

if(typeof(data.opposition) !== 'undefined'){
            document.getElementById(`up${qId,aId}`).innerHTML = `
            <img  class="icons" src="images/upvote.jpg" /></br>${data.opposition}`;
}
        }else{
            document.getElementById(`down${qId,aId}`).innerHTML = `
            <img  class="icons" src="images/downvote.jpg"/></br>${data.ansTotVotes}`;
        }
    })
    
    }


let voteUp = (qId, aId) => {

    let bearer = `Bearer ${token}`;
    
    
    let uri = `http://localhost:5000/api/v1/voteUp/${qId}/${aId}`;
    let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
    let body = {
        username: username
    }
    
    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body:JSON.stringify(body)
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                if(data.success === `true`){
                    document.getElementById(`up${qId,aId}`).innerHTML = `
                    <img  class="icons" src="images/upvoted.jpg" /></br>${data.ansTotVotes}`;

                    if(typeof(data.opposition) !== 'undefined'){
                    document.getElementById(`down${qId,aId}`).innerHTML = `
                    <img  class="icons" src="images/downvote.jpg" /></br>${data.opposition}`;
                    }
}else{
    document.getElementById(`down${qId,aId}`).innerHTML = `
    <img  class="icons" src="images/upvote.jpg"/></br>${data.ansTotVotes}`;
}
    })
    
    }