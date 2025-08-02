// Объявление переменных
let selectedLocation = '';
let selectedGender = '';
let selectedCharacter = null;
let selectedCar = '';
let currentStep = 0;
let swiper;
let locationSwiper;

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

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('screen1').classList.add('hidden');
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
  document.getElementById('screen2').classList.remove('hidden');
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

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('screen1').classList.add('hidden');
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
  document.getElementById('screen2').classList.remove('hidden');

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

function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  currentStep = -1;
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('characterTitle').textContent = selectedCharacter.title;

  // Показываем авто-анимацию и историю
  const car = document.getElementById('carContainer');
  car.classList.remove('hidden', 'animate');
  void car.offsetWidth;
  car.classList.add('animate');

  document.getElementById('screen4').classList.remove('hidden');
  document.getElementById('storyText').textContent = selectedCharacter.fullIntro;
  document.getElementById('storyButtons').innerHTML = '<button class="button" onclick="goToCarSelection()">Далее</button>';
}

function goToCarSelection() {
  document.getElementById('screen4').classList.add('hidden');
  document.getElementById('screen5').classList.remove('hidden');
}

function selectCar(type) {
  selectedCar = type;
  document.getElementById('screen5').classList.add('hidden');
  document.getElementById('screen3').classList.remove('hidden');

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


document.addEventListener('DOMContentLoaded', () => {
  const chooseBtn = document.getElementById('chooseLocationBtn');
  if (chooseBtn) {
    chooseBtn.addEventListener('click', () => {
      const activeSlide = document.querySelector('.mySwiperLocations .swiper-slide-active');
      selectedLocation = activeSlide?.dataset.location || 'Город';
      console.log('Выбрана локация:', selectedLocation);
      document.getElementById('screen5').classList.add('hidden');
      document.getElementById('screen3').classList.remove('hidden');
      currentStep = 0;
      showStep();
    });
  }
});

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
  document.getElementById('screen3').classList.add('hidden');
  document.getElementById('finalText').textContent = result.ending;
  document.getElementById('badgeText').textContent = `🏆 Достижение: ${result.badge}`;
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}
locationSwiper = new Swiper(".mySwiperLocations", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".locations-next",
    prevEl: ".locations-prev",
  },
  pagination: {
    el: ".locations-pagination",
    clickable: true,
  },
});

// Кнопка выбора локации
document.getElementById("chooseLocationBtn").addEventListener("click", () => {
  const activeSlide = document.querySelector(".mySwiperLocations .swiper-slide-active");
  const selectedLocation = activeSlide?.dataset.location;

  if (selectedLocation) {
    console.log("Локация выбрана:", selectedLocation);
    // здесь переход к следующему экрану
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const chooseBtn = document.getElementById('chooseLocationBtn');
  if (chooseBtn) {
    chooseBtn.addEventListener('click', () => {
      const activeSlide = document.querySelector('.mySwiperLocations .swiper-slide-active');
      selectedLocation = activeSlide?.dataset.location || 'Город';
      console.log('Выбрана локация:', selectedLocation);

      document.getElementById('screen3').classList.add('hidden');
      document.getElementById('screen6').classList.remove('hidden');
      document.getElementById('finalText').textContent = `Ты стартуешь из локации: ${selectedLocation}`;
      document.getElementById('badgeText').textContent = `🚘 Авто: ${selectedCar}`;
    });
  }
});
// Свайпер для выбора авто
const carSwiper = new Swiper(".mySwiperCars", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".cars-next",
    prevEl: ".cars-prev",
  },
  pagination: {
    el: ".cars-pagination",
    clickable: true,
  },
});

// Кнопка выбора авто
const chooseCarBtn = document.getElementById("chooseCarBtn");
if (chooseCarBtn) {
  chooseCarBtn.addEventListener("click", () => {
    const activeCar = document.querySelector(".mySwiperCars .swiper-slide-active");
    const selectedCar = activeCar?.dataset.car || "🚗 автомобиль";

    console.log("Выбран авто:", selectedCar);

    // Переход на финальный экран
    document.getElementById("screen5").classList.add("hidden");
    document.getElementById("screen6").classList.remove("hidden");

    document.getElementById("finalText").textContent = `Ты стартуешь из локации: ${selectedLocation}`;
    document.getElementById("badgeText").textContent = `🚘 авто: ${selectedCar}`;
  });
}


