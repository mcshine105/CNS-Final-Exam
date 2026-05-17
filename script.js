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
  if (localStorage.getItem("exam_active") === "true") {
    student = localStorage.getItem("exam_student");
    section = localStorage.getItem("exam_section");
    email = localStorage.getItem("exam_email");
    current = parseInt(localStorage.getItem("exam_current")) || 0;
    score = parseInt(localStorage.getItem("exam_score")) || 0;
    violations = parseInt(localStorage.getItem("exam_violations")) || 0;
    
    // Restore the randomized question arrangement order
    const savedOrder = localStorage.getItem("exam_questions_order");
    if (savedOrder) {
      const indices = JSON.parse(savedOrder);
      // Rebuild the QUESTIONS array structure matching the precise cached arrangement
      const originalQuestions = [...QUESTIONS];
      QUESTIONS.length = 0; 
      indices.forEach(idx => QUESTIONS.push(originalQuestions[idx]));
    }

    document.getElementById("startContainer").classList.add("hidden");
    document.getElementById("examContainer").classList.remove("hidden");
    document.getElementById("examTitle").innerText = "Student: " + student + " | Section: " + section;
    
    examActive = true;
    preventBackNavigation();
    
    // Check if an expiration timestamp exists for the current question
    let savedExpiry = localStorage.getItem("exam_timer_expiry");
    if (savedExpiry) {
      let now = Date.now();
      let timeLeft = Math.ceil((parseInt(savedExpiry) - now) / 1000);
      
      if (timeLeft > 0) {
        timer = timeLeft; // Resume with the calculated remaining duration
      } else {
        // Time ran out while the browser was disconnected
        current++;
        localStorage.removeItem("exam_timer_expiry");
        saveProgress();
        return loadQuestion();
      }
    }
    
    loadQuestion(true); // Flag true means resuming, don't generate a new timestamp
  }
});

// Save current state variables into browser memory
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

// Clear all cache keys upon final execution completion
function clearSavedProgress() {
  localStorage.removeItem("exam_active");
  localStorage.removeItem("exam_student");
  localStorage.removeItem("exam_section", section);
  localStorage.removeItem("exam_email");
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

// 2. BLOCK SYSTEM REFRESH KEY SHORTCUTS
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

// 3. CONFIRMATION PROMPT ON HARD REFRESH BUTTON CLICKS
window.addEventListener("beforeunload", function (e) {
  if (examActive) {
    const confirmationMessage = "Warning: Refreshing or leaving this page will disrupt your exam sequence.";
    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
});

// 4. HISTORY TRAP FUNCTION (Disables Back Button)
function preventBackNavigation() {
  window.history.pushState(null, null, window.location.href);
  window.addEventListener("popstate", function () {
    if (examActive) {
      window.history.history.pushState(null, null, window.location.href);
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
  
  // Tag and map original indexes to preserve random layout sequences upon reload
  let orderArray = QUESTIONS.map((_, i) => i);
  orderArray.sort(() => Math.random() - 0.5);
  localStorage.setItem("exam_questions_order", JSON.stringify(orderArray));
  
  // Apply the randomized order mapping array
  const originalQuestions = [...QUESTIONS];
  QUESTIONS.length = 0;
  orderArray.forEach(idx => QUESTIONS.push(originalQuestions[idx]));
  
  saveProgress();
  loadQuestion(false); // False means new question, generate new timestamp expiry
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

  // If this is a brand new question load, establish a fixed 40-second expiration timestamp
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
  
  localStorage.removeItem("exam_timer_expiry"); // Clear the current timestamp so the next question generates a fresh one
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
      `name=${encodeURIComponent(student)}&email=${encodeURIComponent(email)}&section=${encodeURIComponent(
        section
      )}&score=${score}&total=${QUESTIONS.length}&violations=${violations}&datetime=${encodeURIComponent(
        datetime
      )}`,
  });
}