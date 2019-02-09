let myRecentlyAskQuestions = () => {

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

                let allQuestions = `<div>
                                        <h2>Overflowing Questions</h2>
                                    </div><div id="overflowing">`;
               
                let questionArray = [];
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                   questionArray.push(each)
                    }})

                questionArray.sort(function(a, b) { 
                        return a.id - b.id ;
                      });

                questionArray.reverse();

                questionArray.forEach(each => {

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
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

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.add("high-light-bar-1");
                mostans.classList.remove("high-light-bar-1");
                over.classList.remove("high-light-bar-1");
                
            }  
        })

}


let myMostAnsweredQuestions = () => {

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

                let allQuestions = `<div>
                                        <h2>Overflowing Questions</h2>
                                    </div><div id="overflowing">`;
               
                let questionArray = [];
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                   questionArray.push(each)
                    }})

                questionArray.sort(function(a, b) { 
                        return a.answers.length - b.answers.length ;
                      });

                questionArray.reverse();
                questionArray.forEach(each => {

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
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

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.remove("high-light-bar-1");
                mostans.classList.add("high-light-bar-1");
                over.classList.remove("high-light-bar-1");
            }  
        })
}


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
                                    </div><div id="overflowing">`;
               
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
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
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

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;
    
                const profile = `<p><h2>${username}<br/><img src="images/menu.png"/></h2></p>
                <h2>Questions Asked: <strong id="asked">${asked}</strong>!</br>
                Answers contributed: <strong id="ansContributed">${ansContributed}!</h2>`;
    
                document.getElementById('profile').innerHTML = profile;
            }  
        })

let overFlowingQuestions = () => {

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
                                    </div><div id="overflowing">`;
               
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
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
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

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;
    
                const profile = `<p><h2>${username}<br/><img src="images/menu.png"/></h2></p>
                <h2>Questions Asked: <strong id="asked">${asked}</strong>!</br>
                Answers contributed: <strong id="ansContributed">${ansContributed}!</h2>`;
    
                document.getElementById('profile').innerHTML = profile;

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.remove("high-light-bar-1");
                mostans.classList.remove("high-light-bar-1");
                over.classList.add("high-light-bar-1");
            }  
        })

}

let stringDate = (time) => {
    let value = time.toLocaleDateString('en-GB', {  
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    })
    
    return value;
    }
    
    
let timeDifference = (date) => {
    date = Date.parse(date);
    let difference = date.getTime() - new Date().getTime();

    let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
    if(difference < 1){
        return `some few seconds ago`;
    }else if(difference === 1){
        return `${difference} minute ago`;
    }else if(difference < 61){
        return `${difference} minutes ago`;
    }

    let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
    if(difference === 1){
        return `${difference} hour ago`;
    }else if(difference < 25){
        return `${difference} hours ago`;
    }

    let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
    if(difference === 1){
        return `${difference} day ago`;
    }else if(difference < 32){
        return `${difference} days ago`;
    }

    
    stringDate(date);
}