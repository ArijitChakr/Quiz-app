import { quizData } from "./data.js";

//Constant variables
const parentEl = document.querySelector(".container");
const submitBtn = document.querySelector(".submit-button");
const finalScoreDiv = document.querySelector(".final-score");
const finalScore = document.getElementById("score");
const reloadBtn = document.querySelector(".reload-button");
let i = 1;
let score = 0;

//functions
function init(data, index) {
  let html = `
        <div class="quiz-container quiz-container-${index + 1} ${
    index === 0 ? "" : "hidden"
  }">
           <h2 class="question question-${index + 1}">${data.question}</h2>
           <ul class="answers answers-${index + 1}">
              <input class="answer-${
                index + 1
              }" type="radio" name="selection" data-value="${
    Object.keys(data)[1]
  }"/><label>  ${data.a}</label></br>
              <input class="answer-${
                index + 1
              }" type="radio" name="selection" data-value="${
    Object.keys(data)[2]
  }"/><label>  ${data.b}</label></br>
              <input class="answer-${
                index + 1
              }" type="radio" name="selection" data-value="${
    Object.keys(data)[3]
  }"/><label>  ${data.c}</label></br>
              <input class="answer-${
                index + 1
              }" type="radio" name="selection" data-value="${
    Object.keys(data)[4]
  }"/><label>  ${data.d}</label></br>
           </ul>
        </div>
        `;
  parentEl.insertAdjacentHTML("afterbegin", html);
}

function checkScore() {
  let answers = document.querySelectorAll(`.answer-${i}`);
  for (const [ind, ans] of answers.entries()) {
    if (ans.checked && ans.dataset.value === quizData[i - 1].correct) ++score;
  }
}

function checkError() {
  let check = document.querySelectorAll(`.answer-${i}`);

  let isChecked;
  for (const [_, ans] of check.entries()) {
    if (ans.checked) {
      isChecked = true;
      break;
    } else {
      isChecked = false;
    }
  }
  return isChecked;
}

function submit() {
  if (!checkError()) {
    alert("No answer selected! please select an answer to proceed.");
    return;
  }
  if (i === quizData.length) {
    checkScore();
    document.querySelector(`.quiz-container-${i}`).classList.add("hidden");
    submitBtn.classList.add("hidden");
    finalScoreDiv.classList.remove("hidden");
    finalScore.textContent = `You answered ${score}/${quizData.length} questions correctly`;
  } else {
    checkScore();
    document.querySelector(`.quiz-container-${i}`).classList.add("hidden");
    i++;
    document.querySelector(`.quiz-container-${i}`).classList.remove("hidden");
  }
}

function reloadbutton() {
  i = 1;
  score = 0;
  finalScoreDiv.classList.add("hidden");
  document.querySelector(`.quiz-container-${i}`).classList.remove("hidden");
  submitBtn.classList.remove("hidden");
}

//events and data initializing
quizData.forEach((el, i) => {
  init(el, i);
});
submitBtn.addEventListener("click", submit);
reloadBtn.addEventListener("click", reloadbutton);
