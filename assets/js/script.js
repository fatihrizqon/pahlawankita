const url = `http://127.0.0.1:8000/api/`
const answer_button = document.querySelector("#answer_button");
const question = document.querySelector("#question");
const options = document.querySelector("#options");
const results = document.querySelector("#results");
let section = 'home';
let score = 0;
let question_id;

window.onload = function () {
    document.querySelector("#navigation") ? document.querySelector("#navigation").classList.remove("hidden") : '';
    getQuiz();
    getResult();
}

function index() {
    console.log(score);
    window.location = `http://127.0.0.1:5500/index.html`;
}

function getQuiz() {
    fetch(url + `quiz`)
        .then((response) => response.json())
        .then((response) => {
            // console.log(response.data.options);
            question_id = response.data.question[0].id
            question.innerHTML = `${ response.data.question[0].description }. Beliau lahir pada ${ response.data.question[0].date_of_birth } dan berasal dari ${ response.data.question[0].origin }. ${ response.data.question[0].name }`
            options.innerHTML = '';
            for (option of response.data.options) {
                options.innerHTML += `<span class="flex items-center gap-x-2">
                    <input type="radio" id="answer" name="answer" value="${ option.id }">
                    <label for="${ option.id }">${ option.id } - ${ option.name }</label>
                </span>`
            }
        })
        .catch((response) => console.log(response));
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

function checkAnswer() {
    let answer = parseInt(document.querySelector('input[name="answer"]:checked').value);
    if (answer === question_id) {
        score += 1;
        alert(`Yes you are right! Your current score is ${ score }`);
        return getQuiz();
    } else {
        alert(`Oops... you are picked a wrong answer.`);
        // change the min. score
        if (score > 1) {
            if (confirm(`Your score is ${ score }. Do you want to save this score ?`)) {
                save(score)
            } else {
                // Quiz Closed. Return to base and reset score
                index();
            }
        } else {
            // Quiz Closed. Return to base and reset score
            index();
        }
    }
}

function save(score) {
    let username = prompt(`Please enter your username:`, ``);
    if (username == null || username == "") {
        // Quiz Closed. Return to base and reset score
        index();
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
