let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');

  const container = document.getElementById('options');
  container.innerHTML = '';

  characters[gender].forEach((char, index) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = char.title;
    btn.onclick = () => startCharacterStory(index);
    container.appendChild(btn);
  });

  document.getElementById('step2').classList.remove('hidden');
}

function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  currentStep = 0;

  document.getElementById('step2').classList.add('hidden');
  showStep();
}

function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const container = document.getElementById('step3');
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

  textElem.textContent = step.text;
  buttonsElem.innerHTML = '';

  if (step.choices) {
    // Отображаем кнопки выбора
    step.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'button';
      btn.textContent = choice.label;
      btn.onclick = () => showFinal(choice.result);
      buttonsElem.appendChild(btn);
    });
  } else {
    // Отображаем кнопку "Далее"
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = 'Далее';
    btn.onclick = () => nextStep();
    buttonsElem.appendChild(btn);
  }

  container.classList.remove('hidden');
}

function nextStep() {
  currentStep++;
  if (currentStep < selectedCharacter.steps.length) {
    showStep();
  }
}

function showFinal(result) {
  document.getElementById('step3').classList.add('hidden');
  const finalText = document.getElementById('finalText');
  const badgeText = document.getElementById('badgeText');

  finalText.textContent = result.ending;
  badgeText.textContent = `🏆 Достижение: ${result.badge}`;

  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}



