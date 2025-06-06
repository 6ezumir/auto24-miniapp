
let currentStep = 1;
let answers = [];
const alex = document.getElementById("alex");
const progress = document.getElementById("progress");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".logo").classList.add("fade-in");
  document.querySelector(".intro-text").classList.add("slide-in");
  setTimeout(() => {
    document.getElementById("step1").classList.remove("hidden");
    showAlexReaction("Привет! Давай соберем твой автомобиль мечты! 🚗");
  }, 1200);
});

function nextStep(answer) {
  answers.push(answer);
  updateProgress();
  showAlexReaction("Интересно, ты выбрал " + answer);
  document.getElementById(`step${currentStep}`).classList.add("hidden");
  currentStep++;
  document.getElementById(`step${currentStep}`).classList.remove("hidden");
}

function finishGame(budget) {
  answers.push(budget);
  updateProgress(100);
  showAlexReaction("Отличный выбор! 🚗 Уже мечтаю о твоем авто!");
  document.getElementById(`step${currentStep}`).classList.add("hidden");
  document.getElementById("carBuildAnimation").classList.remove("hidden");
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

function showAlexReaction(text) {
  alex.textContent = "Алекс: " + text;
}

function updateProgress(forceValue) {
  const value = forceValue !== undefined ? forceValue : Math.min((answers.length / 3) * 100, 100);
  progress.style.width = `${value}%`;
}
