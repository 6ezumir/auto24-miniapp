// ДОБАВЛЕНИЕ: состояние для локации
let selectedLocation = '';
let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;
let swiper;
let locationSwiper;

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
let selectedLocation = '';
let selectedGender = '';
let selectedCharacter = null;
let selectedCar = '';
let currentStep = 0;
let swiper;
let locationSwiper;

// Выбор пола
function selectGender(gender) {
  selectedGender = gender;
  showScreen('screen2');

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

  if (swiper) {
    swiper.update();
    swiper.slideTo(0);
  } else {
    swiper = new Swiper('.mySwiperCharacters', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.characters-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.characters-next',
        prevEl: '.characters-prev'
      }
    });
  }
}

// Показ истории персонажа
function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  document.getElementById('characterTitle').textContent = selectedCharacter.title;
  document.getElementById('storyText').textContent = selectedCharacter.fullIntro;
  document.getElementById('storyButtons').innerHTML = `
    <button class="button" onclick="goToCarSelection()">Далее</button>
  `;

  showScreen('screen3');
}

// Переход к выбору авто
function goToCarSelection() {
  showScreen('screen4');
}

// Переход к выбору локации
function selectCar(type) {
  selectedCar = type;
  showScreen('screen5');

  setTimeout(() => {
    if (!locationSwiper) {
      locationSwiper = new Swiper('.mySwiperLocations', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
          el: '.locations-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.locations-next',
          prevEl: '.locations-prev'
        }
      });
    } else {
      locationSwiper.update();
      locationSwiper.slideTo(0);
    }
  }, 100);
}

// Нажатие "Выбрать локацию"
document.addEventListener('DOMContentLoaded', () => {
  const chooseBtn = document.getElementById('chooseLocationBtn');
  if (chooseBtn) {
    chooseBtn.addEventListener('click', () => {
      const activeSlide = document.querySelector('.mySwiperLocations .swiper-slide-active');
      selectedLocation = activeSlide?.dataset.location || 'city';
      currentStep = 0;
      showStep();
      showScreen('screen6'); // просто текстовая сцена
    });
  }
});

// Показ текущего шага истории
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
    btn.className = 'button';
    btn.textContent = 'Далее';
    btn.onclick = () => {
      currentStep++;
      showStep();
    };
    buttonsElem.appendChild(btn);
  }
}

// Финал
function showFinal(result) {
  document.getElementById('finalText').textContent = result.ending;
  document.getElementById('badgeText').textContent = `🏆 Достижение: ${result.badge}`;
  showScreen('final');
}

// Переключение экранов
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');
}

// Переход в Telegram
function goToBot() {
  window.location.href = 'https://t.me/auto24serviceofficial_bot';
}


