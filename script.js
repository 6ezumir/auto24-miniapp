let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;
let swiper;

const characters = {
  'Мужчина': [
    // ... твои персонажи без изменений
  ],
  'Женщина': [
    // ... твои персонажи без изменений
  ]
};

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');

  const container = document.getElementById('options');
  container.innerHTML = '';

  characters[gender].forEach((char, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="card">
        <img src="${char.image}" alt="${char.title}" class="character-avatar">
        <h2>${char.title}</h2>
        <p>${char.intro}</p>
        <button class="button" onclick="startCharacterStory(${index})">Выбрать</button>
      </div>
    `;
    container.appendChild(slide);
  });

  document.getElementById('step2').classList.remove('hidden');

  if (swiper) swiper.update();
  else {
    swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
}

function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  currentStep = 0;

  document.getElementById('step2').classList.add('hidden');
  document.getElementById('characterTitle').textContent = selectedCharacter.title;

  // Запускаем анимацию машины
  animateCar();

  showStep();
}

function animateCar() {
  const car = document.getElementById('carAnimation');
  car.classList.remove('hidden');
  car.style.animation = 'drive 4s forwards';

  // Через 4 секунды убираем машину
  setTimeout(() => {
    car.classList.add('hidden');
    car.style.animation = '';
  }, 4000);
}

function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const container = document.getElementById('step3');
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

  container.classList.remove('hidden');

  textElem.textContent = step.text;
  buttonsElem.innerHTML = '';

  if (step.choices) {
    step.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'button';
      btn.textContent = choice.label;
      btn.onclick = () => showFinal(choice.result);
      buttonsElem.appendChild(btn);
    });
  } else {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = 'Далее';
    btn.onclick = () => nextStep();
    buttonsElem.appendChild(btn);
  }
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
