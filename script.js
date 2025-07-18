let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;
let swiper;

const characters = {
  'Мужчина': [
    {
      title: 'Кадзу — Ходячий Калькулятор',
      intro: 'Ты — предприниматель. Для тебя машина — часть имиджа.',
      fullIntro: 'Он просчитывает всё — от налога на роскошь до остаточной стоимости. Машина для него — инвестиция. Даже цвет выбирается не по настроению, а по ликвидности на вторичке.',
      image: 'entrepreneur.jpg',
      steps: [...]
    },
    {
      title: 'Рэй — Папа на колёсах',
      intro: 'Ты — семьянин. Комфорт важнее понтов.',
      fullIntro: 'Он может одним движением пристегнуть троих детей и за секунду найти упавшую игрушку под креслом. Для него важны безопасность, простор и чтобы кофеварка в подлокотнике влезла.',
      image: 'familyman.jpg',
      steps: [...]
    },
    {
      title: 'Хару — Живу на стипендию',
      intro: 'Ты — студент. Твоя первая машина — это свобода.',
      fullIntro: 'Каждая поездка — это битва за бензин. Он знает, где заправка дешевле на 1.4 рубля. Машина — свобода, даже если под ней картонка от масла.',
      image: 'student.jpg',
      steps: [...]
    }
  ],
  'Женщина': [
    {
      title: 'Мэй — Леди Порядок',
      intro: 'Ты — бизнес-леди. Уверенность — твой стиль.',
      fullIntro: 'Каждое утро у неё по минутам. Она не терпит хаоса — даже в пробке. Её машина — не просто средство передвижения. Это порядок на колёсах.',
      image: 'businesswoman.jpg',
      steps: [...]
    },
    {
      title: 'Аки — Шоппинг-богиня',
      intro: 'Ты — обычная девушка. Любишь комфорт и независимость.',
      fullIntro: 'Её маршрут — от кофе-точки до ТЦ, от ТЦ — к подруге. В машине всё под рукой: антисептик, зонт, шоппер и зарядка на все случаи жизни. Машина — её вторая сумочка.',
      image: 'girl.jpg',
      steps: [...]
    },
    {
      title: 'Кира — На стиле и в движении',
      intro: 'Ты — студентка. Любишь стиль и драйв.',
      fullIntro: 'Музыка громче, чем двигатель. Цвет ногтей — под цвет фараона. Она знает: если не запомнились на парковке, ты вообще не парковался.',
      image: 'studentgirl.jpg',
      steps: [...]
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
