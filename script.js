let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;
let swiper;

const characters = {
  'Мужчина': [
    {
      title: 'Кадзу — Ходячий Калькулятор',
      intro: 'Ты — предприниматель. Для тебя машина — часть имиджа.',
      fullIntro: 'Каждое утро Кадзу открывает рынок и закрывает сделки. Он точно знает, сколько стоит его время. И машина — это продление его бренда. Надёжная, строгая и статусная — именно так он ездит по жизни.',
      image: 'entrepreneur.jpg',
      steps: [
        { text: 'Каждое утро ты стартуешь раньше остальных.' },
        {
          text: 'Ты выбираешь: статус или практичность?',
          choices: [
            { label: 'Статус', result: { ending: 'Ты выбрал путь роскоши!', badge: 'Статусный водитель' } },
            { label: 'Практичность', result: { ending: 'Ты выбрал путь разума!', badge: 'Умный выбор' } }
          ]
        }
      ]
    },
    {
      title: 'Рэй — Папа на колёсах',
      intro: 'Ты — семьянин. Комфорт важнее понтов.',
      fullIntro: 'Рэй — тот, кто возит детей на кружки, закупается на неделю вперёд и всегда думает на два шага вперёд. Его выбор — надёжность, безопасность и багажник, в который влезет вся жизнь.',
      image: 'familyman.jpg',
      steps: [
        { text: 'Ты заботишься о безопасности близких.' },
        {
          text: 'Что важнее при выборе авто?',
          choices: [
            { label: 'Комфорт', result: { ending: 'Ты выбрал уют!', badge: 'Семейный водитель' } },
            { label: 'Экономия', result: { ending: 'Ты выбрал выгоду!', badge: 'Практичный водитель' } }
          ]
        }
      ]
    },
    {
      title: 'Хару — Живу на стипендию',
      intro: 'Ты — студент. Твоя первая машина — это свобода.',
      fullIntro: 'Хару недавно получил права. Он берёт максимум от своей молодости — и минимум по бюджету. Машина для него — это первая в жизни независимость и дорога в любую сторону.',
      image: 'student.jpg',
      steps: [
        { text: 'Каждый рубль на счету.' },
        {
          text: 'Что главное в машине?',
          choices: [
            { label: 'Экономия', result: { ending: 'Ты выбрал разум!', badge: 'Экономный водитель' } },
            { label: 'Стиль', result: { ending: 'Ты выбрал стиль!', badge: 'Молодёжный драйв' } }
          ]
        }
      ]
    }
  ],
  'Женщина': [
    {
      title: 'Мэй — Леди Порядок',
      intro: 'Ты — бизнес-леди. Уверенность — твой стиль.',
      fullIntro: 'Каждое утро у неё по минутам. Она не терпит хаоса — даже в пробке. Её машина — не просто средство передвижения. Это порядок на колёсах.',
      image: 'businesswoman.jpg',
      steps: [
        { text: 'Ты любишь внимание и скорость.' },
        {
          text: 'Что выберешь?',
          choices: [
            { label: 'Статус', result: { ending: 'Ты выбрала престиж!', badge: 'Бизнес-класс' } },
            { label: 'Практичность', result: { ending: 'Ты выбрала комфорт!', badge: 'Комфорт прежде всего' } }
          ]
        }
      ]
    },
    {
      title: 'Аки — Шоппинг-богиня',
      intro: 'Ты — обычная девушка. Любишь комфорт и независимость.',
      fullIntro: 'Аки любит жить в своём ритме. Она свободна, лёгкая и обожает заезжать в торговый центр просто так. Машина — её способ быть самостоятельной. Надёжная, но не скучная.',
      image: 'girl.jpg',
      steps: [
        { text: 'Ты хочешь больше свободы в передвижении.' },
        {
          text: 'Что для тебя важно?',
          choices: [
            { label: 'Безопасность', result: { ending: 'Ты выбрала уверенность!', badge: 'Заботливая' } },
            { label: 'Экономия', result: { ending: 'Ты выбрала выгоду!', badge: 'Рациональная' } }
          ]
        }
      ]
    },
    {
      title: 'Кира — На стиле и в движении',
      intro: 'Ты — студентка. Любишь стиль и драйв.',
      fullIntro: 'Кира только получила права и уже мечтает о стильной машине. Ей важно быть в центре внимания и делать яркие фото в зеркале заднего вида. Она едет в будущее быстро и уверенно.',
      image: 'studentgirl.jpg',
      steps: [
        { text: 'Ты только получила права и хочешь выделяться.' },
        {
          text: 'Что тебе по душе?',
          choices: [
            { label: 'Стиль', result: { ending: 'Ты выбрала яркость!', badge: 'Модный выбор' } },
            { label: 'Экономия', result: { ending: 'Ты выбрала практичность!', badge: 'Разумный выбор' } }
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

  // Запуск анимации машинки
  const car = document.getElementById('carContainer');
  car.classList.remove('hidden');
  car.classList.remove('animate');
  void car.offsetWidth; // перерисовка
  car.classList.add('animate');

  showStep();
}

function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const container = document.getElementById('step3');
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

  container.classList.remove('hidden');

  // Сброс и перезапуск анимации текста
  textElem.classList.remove('fade-in-up');
  void textElem.offsetWidth;
  textElem.textContent = currentStep === 0 && selectedCharacter.fullIntro
    ? selectedCharacter.fullIntro
    : step.text;
  textElem.classList.add('fade-in-up');

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
function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const container = document.getElementById('step3');
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

  container.classList.remove('hidden');

  // 👇 Показываем fullIntro на первом шаге, иначе step.text
  if (currentStep === 0 && selectedCharacter.fullIntro) {
    textElem.textContent = selectedCharacter.fullIntro;
  } else {
    textElem.textContent = step.text;
  }

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

