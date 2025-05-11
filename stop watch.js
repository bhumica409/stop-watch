let [seconds, minutes, hours] = [0, 0, 0];
let display = document.getElementById("display");
let timer = null;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function startTimer() {
  if (!timer) {
    timer = setInterval(stopwatch, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  updateDisplay();
  timer = null;
  document.getElementById("laps").innerHTML = "";
}

function lapTime() {
  const lap = document.createElement("div");
  lap.className = "lap-item";
  lap.innerText = "Lap: " + display.innerText;
  document.getElementById("laps").appendChild(lap);
}

// Drag functionality
const dragTarget = document.getElementById("dragTarget");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

dragTarget.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - dragTarget.getBoundingClientRect().left;
  offsetY = e.clientY - dragTarget.getBoundingClientRect().top;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    dragTarget.style.position = "absolute";
    dragTarget.style.left = `${e.clientX - offsetX}px`;
    dragTarget.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Section reveal animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

document.getElementById("themeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
});
