let current = 0;
let score = 0;
let timer = 40;
let interval;
let student = "";
let section = "";
let email = "";
let violations = 0;
let examActive = false; // Flag to only track violations while actively testing

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwXV7fUu5VnsietiQNt7qYtwDfOCYnyHte46WJ4GRyMLfnL5AdVEfbNggYAUT_uFLRvNw/exec";

// Track when user switches tabs or minimizes window
document.addEventListener("visibilitychange", function() {
  if (document.hidden && examActive) {
    violations++;
    alert("VIOLATION DETECTED!\nDo not leave or switch tabs during the exam. This incident has been logged.");
  }
});

function begin() {
  student = document.getElementById("studentName").value.trim();
  email = document.getElementById("studentEmail").value.trim();
  section = document.getElementById("studentSection").value.trim();

  if (!student) { alert("Please enter student name."); return; }
  if (!email) { alert("Please enter your email address."); return; }
  if (!section) { alert("Please enter section."); return; }

  document.getElementById("startContainer").classList.add("hidden");
  document.getElementById("examContainer").classList.remove("hidden");

  document.getElementById("examTitle").innerText =
    "Student: " + student + " | Section: " + section;

  examActive = true;
  QUESTIONS.sort(() => Math.random() - 0.5);
  loadQuestion();
}

function loadQuestion() {
  if (current >= QUESTIONS.length) return finishExam();

  timer = 40;
  const q = QUESTIONS[current];
  const box = document.getElementById("questionBox");

  box.innerHTML =
    `<h3>${current + 1}. ${q.question}</h3>` +
    q.options
      .map((opt, i) =>
        `<button onclick="submitAnswer('${String.fromCharCode(65 + i)}')">${opt}</button>`
      )
      .join("<br><br>");

  updateTimer();
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

function submitAnswer(ans) {
  const correct = QUESTIONS[current].answer;
  if (ans === correct) score++;
  current++;
  loadQuestion();
}

function updateTimer() {
  document.getElementById("timer").innerText = timer;
  if (timer <= 0) {
    current++;
    loadQuestion();
  }
  timer--;
}

function finishExam() {
  clearInterval(interval);
  examActive = false; // Turn off monitoring

  document.getElementById("examContainer").classList.add("hidden");
  document.getElementById("resultContainer").classList.remove("hidden");

  let datetime = new Date().toLocaleString();
  document.getElementById("studentResult").innerText =
    `${student} (${section}), your score is ${score} out of ${QUESTIONS.length}.`;
  
  // Display violations to the student on-screen
  document.getElementById("violationsResult").innerText = 
    `Total integrity violations recorded: ${violations}`;

  // Package extended info including email & violations count
  fetch(WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      `name=${encodeURIComponent(student)}&email=${encodeURIComponent(email)}&section=${encodeURIComponent(
        section
      )}&score=${score}&total=${QUESTIONS.length}&violations=${violations}&datetime=${encodeURIComponent(
        datetime
      )}`,
  });
}