
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

