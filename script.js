let selectedGender = '';
let selectedCharacter = null;
let currentStep = 0;

// Объект с персонажами
const characters = {
  'Мужчина': [
    {
      title: 'Предприниматель',
      steps: [
        {
          text: 'Ты — амбициозный предприниматель, который ценит комфорт и статус.'
        },
        {
          text: 'Что для тебя важнее?',
          choices: [
            {
              label: 'Скорость',
              result: {
                ending: 'Ты выбрал путь драйва и скорости.',
                badge: 'Скоростной лидер'
              }
            },
            {
              label: 'Статус',
              result: {
                ending: 'Ты выбрал уверенность и респект.',
                badge: 'Статусный владелец'
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Семьянин',
      steps: [
        {
          text: 'Ты — заботливый семьянин. Тебе важно, чтобы близкие чувствовали себя в безопасности.'
        },
        {
          text: 'Что ты выберешь?',
          choices: [
            {
              label: 'Максимум безопасности',
              result: {
                ending: 'Ты выбрал заботу и спокойствие.',
                badge: 'Семейный защитник'
              }
            },
            {
              label: 'Комфорт и драйв',
              result: {
                ending: 'Ты выбрал баланс комфорта и эмоций.',
                badge: 'Сбалансированный водитель'
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Студент',
      steps: [
        {
          text: 'Ты — студент, делающий первый шаг к взрослой жизни.'
        },
        {
          text: 'Что тебе важнее?',
          choices: [
            {
              label: 'Экономия',
              result: {
                ending: 'Ты выбрал разумный подход.',
                badge: 'Бюджетный стратег'
              }
            },
            {
              label: 'Стиль',
              result: {
                ending: 'Ты выбрал самовыражение и свободу.',
                badge: 'Стильный новичок'
              }
            }
          ]
        }
      ]
    }
  ],
  'Женщина': [
    {
      title: 'Бизнес-леди',
      steps: [
        {
          text: 'Ты — уверенная в себе бизнес-леди.'
        },
        {
          text: 'Что отражает твой характер?',
          choices: [
            {
              label: 'Строгий стиль',
              result: {
                ending: 'Ты выбрала элегантность и силу.',
                badge: 'Икона стиля'
              }
            },
            {
              label: 'Яркость и харизма',
              result: {
                ending: 'Ты выбрала свободу и индивидуальность.',
                badge: 'Харизматичный лидер'
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Обычная девушка',
      steps: [
        {
          text: 'Ты ценишь независимость и комфорт.'
        },
        {
          text: 'Что для тебя важнее?',
          choices: [
            {
              label: 'Надёжность',
              result: {
                ending: 'Ты выбрала спокойствие и уверенность.',
                badge: 'Надёжная спутница'
              }
            },
            {
              label: 'Яркость и внимание',
              result: {
                ending: 'Ты выбрала приключения.',
                badge: 'Авто-авантюристка'
              }
            }
          ]
        }
      ]
    },
    {
      title: 'Студентка',
      steps: [
        {
          text: 'Ты — студентка, которая мечтает о своём первом авто.'
        },
        {
          text: 'Что тебя вдохновляет?',
          choices: [
            {
              label: 'Практичность',
              result: {
                ending: 'Ты выбрала уверенность и стабильность.',
                badge: 'Осознанная водительница'
              }
            },
            {
              label: 'Эмоции',
              result: {
                ending: 'Ты выбрала свободу и стиль.',
                badge: 'Дерзкая дебютантка'
              }
            }
          ]
        }
      ]
    }
  ]
};

// Выбор пола
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

// Начать историю персонажа
function startCharacterStory(index) {
  selectedCharacter = characters[selectedGender][index];
  currentStep = 0;

  document.getElementById('step2').classList.add('hidden');
  showStep();
}

// Показ текущего шага
function showStep() {
  const step = selectedCharacter.steps[currentStep];
  const textElem = document.getElementById('storyText');
  const buttonsElem = document.getElementById('storyButtons');

  textElem.textContent = step.text;
  buttonsElem.innerHTML = '';

  if (step.choices) {
    // Показываем варианты выбора
    step.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'button button-variant';
      btn.textContent = choice.label;
      btn.onclick = () => showFinal(choice.result);
      buttonsElem.appendChild(btn);
    });
  } else {
    // Кнопка "Далее"
    const btn = document.createElement('button');
    btn.className = 'button button-continue';
    btn.textContent = 'Далее';
    btn.onclick = () => nextStep();
    buttonsElem.appendChild(btn);
  }

  document.getElementById('step3').classList.remove('hidden');
}

// Переход на следующий шаг
function nextStep() {
  currentStep++;
  if (currentStep < selectedCharacter.steps.length) {
    showStep();
  }
}

// Финальный экран
function showFinal(result) {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('finalText').textContent = result.ending;
  document.getElementById('badgeText').textContent = `🏆 Достижение: ${result.badge}`;
  document.getElementById('final').classList.remove('hidden');
}

// Переход в Telegram
function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

