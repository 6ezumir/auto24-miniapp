let currentStep = 1;
let answers = [];

const alex = document.getElementById("alex");
const progress = document.getElementById("progress");

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
  showAlexReaction(`Интересно, ты выбрал: ${answer} 🤔`);

  document.getElementById(`step${currentStep}`).classList.add("hidden");
  currentStep++;

  const nextStepElement = document.getElementById(`step${currentStep}`);
  if (nextStepElement) {
    nextStepElement.classList.remove("hidden");
  }
}

function finishGame(budget) {
  answers.push(budget);
  updateProgress(100);

  showAlexReaction("Отличный выбор! 🚗 Уже мечтаю о твоем авто!");

  document.getElementById(`step${currentStep}`).classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");

  // Плавная сборка машины
  showAssembly();

  // Финальный текст
  document.getElementById("finalText").innerHTML = `
    🚗 Ты выбрал:<br>
    <b>Кузов:</b> ${answers[0]}<br>
    <b>Страна:</b> ${answers[1]}<br>
    <b>Бюджет:</b> ${answers[2]}
  `;
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

function showAlexReaction(text) {
  alex.textContent = `Алекс: ${text}`;
  alex.classList.remove("visible");
  void alex.offsetWidth; // перезапуск анимации
  alex.classList.add("visible");
}

function updateProgress(value) {
  const val = value !== undefined ? value : Math.min((answers.length / 3) * 100, 100);
  progress.style.width = val + "%";
}

function showAssembly() {
  const parts = document.querySelectorAll('.part');
  let index = 0;

  function showNextPart() {
    if (index < parts.length) {
      parts[index].classList.add('visible');
      index++;
      setTimeout(showNextPart, 700); // скорость появления деталей
    } else {
      document.getElementById("finalText").classList.add("visible");
    }
  }

  showNextPart();
}
