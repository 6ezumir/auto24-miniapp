let currentStep = 1;

function nextStep() {
  document.getElementById('step' + currentStep).classList.add('hidden');
  currentStep++;
  document.getElementById('step' + currentStep).classList.remove('hidden');
}

function finishGame() {
  document.getElementById('step' + currentStep).classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
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
  typeAlexText("Привет! Я Алекс — давай соберем твой автомобиль мечты! 🚗", "alex");
});
