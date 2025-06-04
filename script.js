let currentStep = 1;
let answers = [];
const alex = document.getElementById("alex");
const progress = document.getElementById("progress");

// При загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".logo").classList.add("fade-in");
  document.querySelector(".intro-text").classList.add("slide-in");

  setTimeout(() => {
    document.getElementById("step1").classList.remove("hidden");
    showAlexReaction("Привет! Я Алекс — давай соберем твой автомобиль мечты! 🚗");
  }, 1200);
});

function nextStep(answer) {
  answers.push(answer);
  updateProgress();
  showAlexReaction(`Интересно, ты выбрал ${answer} 🤔`);
  document.getElementById(`step${currentStep}`).classList.add("hidden");
  currentStep++;
  const next = document.getElementById(`step${currentStep}`);
  if (next) {
    next.classList.remove("hidden");
  }
}

function finishGame(budget) {
  answers.push(budget);
  updateProgress(100);
  showAlexReaction("Отличный выбор! 🚗 Уже мечтаю о твоем авто!");

  document.getElementById(`step${currentStep}`).classList.add("hidden");

  // Показ анимации сборки авто
  const buildContainer = document.getElementById("carBuildAnimation");
  buildContainer.classList.remove("hidden");

  // Запускаем финальный экран через 2.5 секунды
  setTimeout(() => {
    buildContainer.classList.add("hidden");
    document.getElementById("final").classList.remove("hidden");
    document.getElementById("finalText").innerHTML = `
      🚗 Ты выбрал:<br>
      Кузов: <b>${answers[0]}</b><br>
      Страна: <b>${answers[1]}</b><br>
      Бюджет: <b>${answers[2]}</b>
    `;
  }, 2500);
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

function showAlexReaction(customText = "") {
  const phrases = [
    "Классный выбор! 😎",
    "Отлично! 🚗",
    "Интересно! 🔥",
    "Хороший вариант! 🚀",
    customText
  ].filter(Boolean);
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  alex.textContent = `Алекс: ${phrase}`;
}

function updateProgress(forceValue) {
  const value = forceValue !== undefined ? forceValue : Math.min((answers.length / 3) * 100, 100);
  progress.style.width = `${value}%`;
}
