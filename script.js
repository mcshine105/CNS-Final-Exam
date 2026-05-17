let current = 0;
let score = 0;
let timer = 40;
let interval;
let student = "";
let section = "";
let email = "";
let violations = 0;
let examActive = false;

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwXV7fUu5VnsietiQNt7qYtwDfOCYnyHte46WJ4GRyMLfnL5AdVEfbNggYAUT_uFLRvNw/exec";

// --- RESUME MECHANISM ON PAGE LOAD ---
window.addEventListener("DOMContentLoaded", () => {
  // Check if a saved session exists in local storage
  if (localStorage.getItem("exam_active") === "true") {
    student = localStorage.getItem("exam_student");
    section = localStorage.getItem("exam_section");
    email = localStorage.getItem("exam_email");
    current = parseInt(localStorage.getItem("exam_current")) || 0;
    score = parseInt(localStorage.getItem("exam_score")) || 0;
    violations = parseInt(localStorage.getItem("exam_violations")) || 0;
    
    // Bypass login form and go straight to testing module
    document.getElementById("startContainer").classList.add("hidden");
    document.getElementById("examContainer").classList.remove("hidden");
    document.getElementById("examTitle").innerText = "Student: " + student + " | Section: " + section;
    
    examActive = true;
    preventBackNavigation();
    
    // Note: To preserve stability upon crash, we avoid re-sorting questions 
    // during a resume event so indices map properly to answer parameters.
    loadQuestion();
  }
});

// Save current variables into browser memory cache
function saveProgress() {
  if (examActive) {
    localStorage.setItem("exam_active", "true");
    localStorage.setItem("exam_student", student);
    localStorage.setItem("exam_section", section);
    localStorage.setItem("exam_email", email);
    localStorage.setItem("exam_current", current);
    localStorage.setItem("exam_score", score);
    localStorage.setItem("exam_violations", violations);
  }
}

// Clear storage variables upon completing the test cleanly
function clearSavedProgress() {
  localStorage.removeItem("exam_active");
  localStorage.removeItem("exam_student");
  localStorage.removeItem("exam_section");
  localStorage.removeItem("exam_email");
  localStorage.removeItem("exam_current");
  localStorage.removeItem("exam_score");
  localStorage.removeItem("exam_violations");
}

// 1. TRACK TAB SWITCHES / MINIMIZATION
document.addEventListener("visibilitychange", function() {
  if (document.hidden && examActive) {
    violations++;
    saveProgress(); // Log the violation into storage immediately
    alert("VIOLATION DETECTED!\nDo not leave or switch tabs during the exam. This incident has been logged.");
  }
});

// 2. BLOCK SYSTEM REFRESH KEY SHORTCUTS (F5, Ctrl+R, Cmd+R)
window.addEventListener("keydown", function (e) {
  if (examActive) {
    if (e.key === "F5" || e.keyCode === 116) {
      e.preventDefault();
      alert("Refresh is disabled! Any attempt to reload will disrupt your exam entry.");
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.keyCode === 82)) {
      e.preventDefault();
      alert("Refresh shortcuts are locked during the examination session.");
    }
  }
});

// 3. SHOW CONFIRMATION WARNING ON HARD SYSTEM RELOAD
window.addEventListener("beforeunload", function (e) {
  if (examActive) {
    const confirmationMessage = "Warning: Refreshing or leaving this page will disrupt your timer sequence.";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

// 4. HISTORY TRAP FUNCTION (Disables Back Button navigation)
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

  document.getElementById("examTitle").innerText = "Student: " + student + " | Section: " + section;

  examActive = true;
  preventBackNavigation();
  
  // Randomize questions list on an original test launch initialization
  QUESTIONS.sort(() => Math.random() - 0.5);
  
  saveProgress();
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
        `<button onclick=\"submitAnswer('${String.fromCharCode(65 + i)}')\">${opt}</button>`
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
  
  saveProgress(); // Store metrics data before loading the next view instance
  loadQuestion();
}

function updateTimer() {
  document.getElementById("timer").innerText = timer;
  if (timer <= 0) {
    current++;
    saveProgress(); // Commit tracking increments to local registry cache
    loadQuestion();
  }
  timer--;
}

function finishExam() {
  clearInterval(interval);
  examActive = false; 
  clearSavedProgress(); // Delete session cache data to allow future test attempts

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