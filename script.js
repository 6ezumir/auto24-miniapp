let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;
let swiper;

const characters = {
  'Мужчина': [
    {
      title: 'Предприниматель',
      intro: 'Ты предприниматель, который ценит статус и комфорт.',
      steps: [
        { text: 'Ты мечтаешь о машине, подчеркивающей успех.' },
        { text: 'Тебе предлагают выбор: сэкономить или выбрать роскошь.' },
        { 
          text: 'Что выберешь?', 
          choices: [
            { label: 'Экономия', result: { ending: 'Ты выбрал разумный подход.', badge: 'Практичный' }},
            { label: 'Стиль', result: { ending: 'Ты выбрал путь максимализма.', badge: 'Максималист' }}
          ]
        }
      ]
    }
  ],
  'Женщина': [
    {
      title: 'Бизнес-леди',
      intro: 'Ты уверенная в себе женщина, стремящаяся к успеху.',
      steps: [
        { text: 'Ты мечтаешь об автомобиле, подчеркивающем твой стиль.' },
        { text: 'Тебе предлагают выбор: практичность или эффектность.' },
        { 
          text: 'Что выберешь?', 
          choices: [
            { label: 'Практичность', result: { ending: 'Ты выбрала надежность.', badge: 'Прагматик' }},
            { label: 'Эффектность', result: { ending: 'Ты выбрала стиль и смелость.', badge: 'Икона Стиля' }}
          ]
        }
      ]
    }
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
      <h2>${char.title}</h2>
      <p>${char.intro}</p>
      <button class="button" onclick="startCharacterStory(${index})">Выбрать</button>
    `;
    container.appendChild(slide);
  });

  document.getElementById('step2').classList.remove('hidden');

  if (swiper) swiper.update();
  else {
    swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
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
  document.getElementById('characterTitle').innerText = selectedCharacter.title;
  document.getElementById('characterIntro').innerText = selectedCharacter.intro;
  document.getElementById('step3').classList.remove('hidden');
}

function goToStory() {
  document.getElementById('step3').classList.add('hidden');
  showStep();
}

function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

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
    btn.className = 'button button-continue';
    btn.textContent = 'Далее';
    btn.onclick = () => nextStep();
    buttonsElem.appendChild(btn);
  }

  document.getElementById('step4').classList.remove('hidden');
}

function nextStep() {
  currentStep++;
  if (currentStep < selectedCharacter.steps.length) {
    showStep();
  }
}

function showFinal(result) {
  document.getElementById('step4').classList.add('hidden');
  document.getElementById('finalText').textContent = result.ending;
  document.getElementById('badgeText').textContent = `🏆 Достижение: ${result.badge}`;
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}
