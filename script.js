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

// 1. TRACK TAB SWITCHES / MINIMIZATION
document.addEventListener("visibilitychange", function() {
  if (document.hidden && examActive) {
    violations++;
    alert("VIOLATION DETECTED!\nDo not leave or switch tabs during the exam. This incident has been logged.");
  }
});

// 2. BLOCK SYSTEM REFRESH KEY SHORTCUTS
window.addEventListener("keydown", function (e) {
  if (examActive) {
    // Intercept F5
    if (e.key === "F5" || e.keyCode === 116) {
      e.preventDefault();
      alert("Refresh is disabled! Any attempt to reload will disrupt your exam entry.");
    }
    // Intercept Ctrl+R (Windows) or Cmd+R (Mac)
    if ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.keyCode === 82)) {
      e.preventDefault();
      alert("Refresh shortcuts are locked during the examination session.");
    }
  }
});

// 3. SHOW DIALOG WARNING IF THEY INTERACT WITH THE BROWSER REFRESH/CLOSE BUTTONS
window.addEventListener("beforeunload", function (e) {
  if (examActive) {
    // Modern browsers display a standard security prompt instead of custom strings, 
    // but setting e.returnValue triggers the warning box to halt the exit.
    const confirmationMessage = "Warning: Refreshing or leaving this page will reset your progress entirely.";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

// 4. HISTORY TRAP FUNCTION (Disables the Back Action)
function preventBackNavigation() {
  window.history.pushState(null, null, window.location.href);
  
  window.addEventListener("popstate", function () {
    if (examActive) {
      window.history.pushState(null, null, window.location.href);
      alert("Navigation is locked! You cannot use the back button during the exam.");
    }
  });
}

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
  
  // Activate navigation blocks immediately on test start
  preventBackNavigation();
  
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
  examActive = false; // Turn off monitoring and release the history/refresh lock parameters

  document.getElementById("examContainer").classList.add("hidden");
  document.getElementById("resultContainer").classList.remove("hidden");

  let datetime = new Date().toLocaleString();
  document.getElementById("studentResult").innerText =
    `${student} (${section}), your score is ${score} out of ${QUESTIONS.length}.`;
  
  document.getElementById("violationsResult").innerText = 
    `Total integrity violations recorded: ${violations}`;

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