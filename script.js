let questions = [];
let current = 0;

const questionBox = document.getElementById("question-box");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const jumpInput = document.getElementById("jump-input");
const jumpBtn = document.getElementById("jump-btn");

// ✅ Replace this URL with your GitHub raw link later
const jsonURL = "https://tnd4-zqjs.github.io/pcilmockexamset1/set1.json";

fetch(jsonURL)
  .then((res) => res.json())
  .then((data) => {
    questions = data;
    loadQuestion(current);
  });

function loadQuestion(index) {
  const q = questions[index];
  questionBox.innerHTML = `
    <h3>Q${index + 1}. ${q.question}</h3>
    ${Object.entries(q.options)
      .map(
        ([key, text]) => `
      <div class="option" data-key="${key}">${key}. ${text}</div>
    `
      )
      .join("")}
  `;

  document.querySelectorAll(".option").forEach((opt) => {
    opt.addEventListener("click", () => handleAnswer(opt, q.answer));
  });

  nextBtn.disabled = true;
  jumpInput.value = index + 1;
}

function handleAnswer(optionEl, correctAnswer) {
  const selected = optionEl.getAttribute("data-key");

  document.querySelectorAll(".option").forEach((opt) => {
    opt.classList.add("disabled");
    const key = opt.getAttribute("data-key");
    if (key === correctAnswer) {
      opt.classList.add("correct");
    } else if (key === selected) {
      opt.classList.add("incorrect");
    }
  });

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (current < questions.length - 1) {
    current++;
    loadQuestion(current);
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    loadQuestion(current);
  }
});

jumpBtn.addEventListener("click", () => {
  const number = parseInt(jumpInput.value);
  if (!isNaN(number) && number >= 1 && number <= questions.length) {
    current = number - 1;
    loadQuestion(current);
  } else {
    alert("Please enter a valid question number (1–" + questions.length + ")");
  }
});
