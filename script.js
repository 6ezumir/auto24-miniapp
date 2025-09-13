// Объявление переменных
let selectedLocation = '';
let selectedGender = '';
let selectedCharacter = null;
let selectedCar = '';
let currentStep = 0;
let swiper;
let locationSwiper;


// Генерация и сохранение уникального промокода
function getPromoCode() {
  let code = localStorage.getItem("promoCode");
  if (!code) {
    code = "AUTO24-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem("promoCode", code);
  }
  return code;
}


// Универсальная функция показа нужного экрана
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}

// Словарь персонажей
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

// Выбор пола
function selectGender(gender) {
  selectedGender = gender;
  const container = document.getElementById('options');
  container.innerHTML = '';

  characters[gender].forEach((char, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class=".character-card">
        <img src="${char.image}" alt="${char.title}" class="character-avatar">
        <h2>${char.title}</h2>
        <p>${char.intro}</p>
        <button class="button" onclick="startCharacterStory(${index})">Выбрать</button>
      </div>
    `;
    container.appendChild(slide);
  });

  showScreen('screen2');

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

// Выбор персонажа → экран с локацией
function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  currentStep = -1;
  showScreen('screen3');

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

// Кнопка "Выбрать локацию"
document.getElementById("chooseLocationBtn").addEventListener("click", () => {
  const activeSlide = document.querySelector(".mySwiperLocations .swiper-slide-active");
  selectedLocation = activeSlide?.dataset.location || "Город";

  console.log("Выбрана локация:", selectedLocation);

  showScreen("screen4");

  document.getElementById("characterTitle").textContent = selectedCharacter.title;
  document.getElementById("storyText").textContent = selectedCharacter.fullIntro;
  document.getElementById("storyButtons").innerHTML = '<button class="button" onclick="goToCarSelection()">Далее</button>';
  
  // ✅ Показать машину
  const car = document.getElementById("carContainer");
  if (car) {
    car.classList.remove("hidden");   // показать
    car.classList.remove("animate");  // сбросить анимацию
    void car.offsetWidth;             // перезапустить анимацию
    car.classList.add("animate");     // запустить снова
  }
});


// Переход к выбору авто
function goToCarSelection() {
  showScreen('screen5');
}

// Выбор авто
chooseCarBtn.addEventListener("click", () => {
  const activeCar = document.querySelector(".mySwiperCars .swiper-slide-active");
  selectedCar = activeCar?.dataset.car || "🚗 автомобиль";

  console.log("Выбран авто:", selectedCar);

  showScreen("screen6");

  // Текст благодарности
  document.getElementById("finalText").textContent = `Ты стартуешь из: ${selectedLocation}`;
  document.getElementById("badgeText").textContent = `🚘 Твой выбор: ${selectedCar}`;
  document.getElementById("promoText").textContent = `🎁 Промокод: ${getPromoCode()}`;
});


// Прогресс по шагам
function nextStep() {
  currentStep++;
  if (currentStep < selectedCharacter.steps.length) {
    showStep();
  }
}

function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');
  textElem.classList.remove('fade-in-up');
  void textElem.offsetWidth;
  textElem.textContent = step.text;
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

function showFinal(result) {
  showScreen('screen6');
  document.getElementById('finalText').textContent = result.ending;
  document.getElementById('badgeText').textContent = `🏆 Достижение: ${result.badge}`;
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

// Инициализация свайпера авто
const carSwiper = new Swiper(".mySwiperCars", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: false,
  navigation: {
    nextEl: ".cars-next",
    prevEl: ".cars-prev"
  },
  pagination: {
    el: ".cars-pagination",
    clickable: true
  }
});


