let current = 0;
let score = 0;
let timer = 40;
let interval;
let student = "";
let section = "";
let violations = 0;
let examActive = false;

// Paste your actual Google Apps Script Web App URL between the quotation marks below
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwXV7fUu5VnsietiQNt7qYtwDfOCYnyHte46WJ4GRyMLfnL5AdVEfbNggYAUT_uFLRvNw/exec";

// --- RESUME MECHANISM ON PAGE LOAD ---
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("exam_active") === "true") {
    student = localStorage.getItem("exam_student");
    section = localStorage.getItem("exam_section");
    current = parseInt(localStorage.getItem("exam_current")) || 0;
    score = parseInt(localStorage.getItem("exam_score")) || 0;
    violations = parseInt(localStorage.getItem("exam_violations")) || 0;
    
    const savedOrder = localStorage.getItem("exam_questions_order");
    if (savedOrder) {
      const indices = JSON.parse(savedOrder);
      const originalQuestions = [...QUESTIONS];
      QUESTIONS.length = 0; 
      indices.forEach(idx => QUESTIONS.push(originalQuestions[idx]));
    }

    document.getElementById("startContainer").classList.add("hidden");
    document.getElementById("examContainer").classList.remove("hidden");
    document.getElementById("examTitle").innerText = "Student: " + student + " | Section: " + section;
    
    examActive = true;
    preventBackNavigation();
    
    let savedExpiry = localStorage.getItem("exam_timer_expiry");
    if (savedExpiry) {
      let now = Date.now();
      let timeLeft = Math.ceil((parseInt(savedExpiry) - now) / 1000);
      
      if (timeLeft > 0) {
        timer = timeLeft;
      } else {
        current++;
        localStorage.removeItem("exam_timer_expiry");
        saveProgress();
        return loadQuestion();
      }
    }
    
    loadQuestion(true);
  }
});

function saveProgress() {
  if (examActive) {
    localStorage.setItem("exam_active", "true");
    localStorage.setItem("exam_student", student);
    localStorage.setItem("exam_section", section);
    localStorage.setItem("exam_current", current);
    localStorage.setItem("exam_score", score);
    localStorage.setItem("exam_violations", violations);
  }
}

function clearSavedProgress() {
  localStorage.removeItem("exam_active");
  localStorage.removeItem("exam_student");
  localStorage.removeItem("exam_section");
  localStorage.removeItem("exam_current");
  localStorage.removeItem("exam_score");
  localStorage.removeItem("exam_violations");
  localStorage.removeItem("exam_timer_expiry");
  localStorage.removeItem("exam_questions_order");
}

// 1. TRACK TAB SWITCHES / MINIMIZATION
document.addEventListener("visibilitychange", function() {
  if (document.hidden && examActive) {
    violations++;
    saveProgress();
    alert("VIOLATION DETECTED!\nDo not leave or switch tabs during the exam. This incident has been logged.");
  }
});

// 2. SECURITY SHORTCUT INTERCEPTION
window.addEventListener("keydown", function (e) {
  if (examActive) {
    if (e.key === "F5" || e.keyCode === 116) {
      e.preventDefault();
      alert("Refresh is disabled during the exam.");
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "r" || e.keyCode === 82)) {
      e.preventDefault();
      alert("Refresh shortcuts are locked during the examination.");
    }
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      e.preventDefault();
      handleScreenshotViolation();
    }
    if (e.metaKey && e.shiftKey && (e.key === "S" || e.keyCode === 83)) {
      handleScreenshotViolation();
    }
    if (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4")) {
      handleScreenshotViolation();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.keyCode === 67)) {
      e.preventDefault();
      alert("Copying text is strictly prohibited.");
    }
  }
});

function handleScreenshotViolation() {
  violations++;
  saveProgress();
  navigator.clipboard.writeText(""); 
  alert("VIOLATION DETECTED!\nScreenshots and screen snips are strictly prohibited. This attempt has been logged.");
}

document.addEventListener("copy", (e) => {
  if (examActive) {
    e.preventDefault();
    navigator.clipboard.writeText("");
  }
});

// 3. REFRESH WARNING
window.addEventListener("beforeunload", function (e) {
  if (examActive) {
    const confirmationMessage = "Warning: Refreshing or leaving this page will disrupt your exam sequence.";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

// 4. HISTORY LOCK
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
  section = document.getElementById("studentSection").value.trim();

  if (!student) { alert("Please enter student name."); return; }
  if (!section) { alert("Please enter section."); return; }

  document.getElementById("startContainer").classList.add("hidden");
  document.getElementById("examContainer").classList.remove("hidden");
  document.getElementById("examTitle").innerText = "Student: " + student + " | Section: " + section;

  examActive = true;
  preventBackNavigation();
  
  let orderArray = QUESTIONS.map((_, i) => i);
  orderArray.sort(() => Math.random() - 0.5);
  localStorage.setItem("exam_questions_order", JSON.stringify(orderArray));
  
  const originalQuestions = [...QUESTIONS];
  QUESTIONS.length = 0;
  orderArray.forEach(idx => QUESTIONS.push(originalQuestions[idx]));
  
  saveProgress();
  loadQuestion(false);
}

function loadQuestion(isResuming = false) {
  if (current >= QUESTIONS.length) return finishExam();

  const q = QUESTIONS[current];
  const box = document.getElementById("questionBox");

  box.innerHTML =
    `<h3>${current + 1}. ${q.question}</h3>` +
    q.options
      .map((opt, i) =>
        `<button onclick="submitAnswer('${String.fromCharCode(65 + i)}')">${opt}</button>`
      )
      .join("<br><br>");

  if (!isResuming) {
    timer = 40;
    let expiryTime = Date.now() + (timer * 1000);
    localStorage.setItem("exam_timer_expiry", expiryTime.toString());
  }

  updateTimerDisplay();
  clearInterval(interval);
  interval = setInterval(updateTimerSequence, 1000);
}

function submitAnswer(ans) {
  const correct = QUESTIONS[current].answer;
  if (ans === correct) score++;
  current++;
  
  localStorage.removeItem("exam_timer_expiry");
  saveProgress();
  loadQuestion(false);
}

function updateTimerSequence() {
  let expiry = parseInt(localStorage.getItem("exam_timer_expiry"));
  if (!expiry) return;

  let now = Date.now();
  let timeLeft = Math.ceil((expiry - now) / 1000);

  if (timeLeft <= 0) {
    clearInterval(interval);
    current++;
    localStorage.removeItem("exam_timer_expiry");
    saveProgress();
    loadQuestion(false);
  } else {
    timer = timeLeft;
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  document.getElementById("timer").innerText = timer;
}

function finishExam() {
  clearInterval(interval);
  examActive = false; 
  clearSavedProgress();

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
      `name=${encodeURIComponent(student)}&section=${encodeURIComponent(
        section
      )}&score=${score}&total=${QUESTIONS.length}&violations=${violations}&datetime=${encodeURIComponent(
        datetime
      )}`,
  });
}