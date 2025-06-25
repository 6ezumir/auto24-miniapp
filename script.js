let currentStep = 1;

function nextStep() {
  document.getElementById('step' + currentStep).classList.add('hidden');
  currentStep++;
  if (currentStep <= 3) {
    document.getElementById('step' + currentStep).classList.remove('hidden');
  } else {
    finishGame();
  }
}

function finishGame() {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
  typeAlexText("Анализируем твой выбор...", "finalText", 35); // 👈 эффект печатающегося текста
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

function typeAlexText(text, elementId, delay = 50) {
  const el = document.getElementById(elementId);
  let i = 0;
  el.textContent = "";
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, delay);
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  typeAlexText("Привет! Я Алекс. Соберем авто мечты? 🚗", "alex");
});
