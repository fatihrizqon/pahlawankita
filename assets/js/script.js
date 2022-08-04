const url = `https://api-pahlawankita.herokuapp.com/api/`;
const answer_button = document.querySelector("#answer_button");
const question = document.querySelector("#question");
const question_card = document.querySelector("#question_card");
const options = document.querySelector("#options");
const results = document.querySelector("#results");
const clue = document.querySelector("#clue");
const health_info = document.querySelector("#health");

let section = 'home';
let score = 0;
let health = 5;
let question_id;
let timer;

/* Navbar Effects */
window.onscroll = () => {
    const navbar = document.querySelector("#navbar");
    const fixed = navbar.offsetTop;
    if (window.pageYOffset > fixed) {
        navbar.classList.add("navbar");
        navbar.classList.remove("navbar-transparent");
    } else {
        navbar.classList.remove("navbar");
        navbar.classList.add("navbar-transparent");
    }
};

window.onload = () => {
    document.querySelector("#navigation") ? document.querySelector("#navigation").classList.remove("hidden") : '';
    getQuiz();
    getResult();
}

function index() {
    window.location = `https://fatihrizqon.github.io/pahlawankita`;
}

function getTimer() {
    document.querySelector("#score").innerHTML = 'Score: ' + score;
    var sec = 15;
    timer = setInterval(function () {
        document.querySelector("#timer").innerHTML = 'Remaining Time: ' + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            health--;
            return getQuiz();
        }
    }, 1000);
}

function getQuiz() {
    if (this.getChances()) {
        fetch(url + `quiz`)
            .then((response) => response.json())
            .then((response) => {
                question_id = response.data.question[0].id
                clue.innerHTML =
                    `<div class="w-[200px] h-[200px] md:w-[250px] md:h-[250px] bg-cover rounded-full" style="background-image: url('https://direktoratk2krs.kemsos.go.id/admin-pc/assets/img/pahlawan/${ question_id }.jpg');"> </div>`
                question.innerHTML = `${ response.data.question[0].description }. Beliau lahir pada ${ response.data.question[0].date_of_birth } dan berasal dari ${ response.data.question[0].origin }.`
                options.innerHTML = '';
                for (option of response.data.options) {
                    options.innerHTML += `<span class="flex items-center gap-x-2">
                    <input type="radio" id="answer" name="answer" value="${ option.id }">
                    <label for="${ option.id }">${ option.name }</label>
                </span>`
                }
                return this.getTimer();
            })
            .catch((response) => console.log(response))
    } else {
        console.log('quiz over');
        return this.index();
    }
}

function getResult() {
    fetch(url + `result`)
        .then((response) => response.json())
        .then((response) => {
            for (result of response.data) {
                results.innerHTML += `
                <li class="flex justify-between">
                    <span> ${ result.username } </span>
                    <span> (Score ${ result.score }) </span>
                </li>`
            }
        })
        .catch((response) => console.log(response));
}

function getChances() {
    health_info.innerHTML = 'Chances: ' + health;
    if (health == 0) {
        window.clearInterval(timer);
        alert(`[Quiz Over] Oops... you are missed out your chance.`);
        return this.stopQuiz();
    } else {
        return true;
    }
}

function checkAnswer() {
    let answer = document.querySelector('input[name="answer"]:checked') ?? false;
    if (answer.value === undefined) return alert("Please select an option.")
    if (parseInt(answer.value) === question_id) {
        window.clearInterval(timer);
        score++;
        alert(`Yes you are right! Your current score is ${ score }`);
        return this.getQuiz();
    } else {
        window.clearInterval(timer);
        alert(`[Quiz Over] Oops... you are picked a wrong answer.`);
        health--;
        return this.getQuiz();
    }
}

function stopQuiz() {
    if (score > 10) {
        if (confirm(`Your score is ${ score }. Do you want to save this score ?`)) {
            return this.save(score)
        } else {
            // Quiz Closed. Return to base and reset score
            return this.index();
        }
    } else {
        // Quiz Closed. Return to base and reset score
        alert(`Sorry are unable to save this result. Your score is ${ score }.`);
        return this.index();
    }
}

function save(score) {
    let username = prompt(`Please enter your username:`, ``);
    if (username == null || username == "") {
        // Quiz Closed. Return to base and reset score
        return this.index()
    } else {
        // save to database redirect to leaderboard and reset the score
        fetch(url + `result`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': username, 'score': score })
        }).then(response => response.json())
            .then(response => alert(response.message))
            .catch((response) => console.log(response));
        score = 0;
    }
}


















// function getQuiz(e) {
//     fetch("http://127.0.0.1:8000/api/quiz")
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//         })
//         .catch((response) => console.log(response));
// }

// cek jawaban, jika benar getQuiz(), salah keluar score & konfirmasi





/**
window.setInterval(
    (window.onload = function getQuiz() {
        fetch("http://127.0.0.1:8000/api/quiz")
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                // document.getElementById("loading").classList.toggle("hidden");
                // document.getElementById("quote").classList.toggle("hidden");
                // quote = response[Math.floor(Math.random() * response.length)];
                // document.getElementById("quoteText").innerHTML = `"${ quote.text }"`;
                // document.getElementById("quoteAuthor").innerHTML = `& mdash; ${ quote.author } `;
            })
            .catch((response) => console.log(response));
    }),
    7000
);
*/
