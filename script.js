let selectedGender = '';

const options = {
  'Мужчина': [
    {
      title: '💼 Предприниматель',
      text: 'Премиум и скорость.',
      legend: 'Выбираешь статус.'
    },
    {
      title: '🧘‍♂️ Обычный парень',
      text: 'Комфорт и драйв.',
      legend: 'Баланс свободы.'
    },
    {
      title: '🎓 Студент',
      text: 'Первая машина.',
      legend: 'Твоя свобода.'
    }
  ],
  'Женщина': [
    {
      title: '👠 Бизнес-леди',
      text: 'Стиль и решительность.',
      legend: 'Твой ритм.'
    },
    {
      title: '👩‍🍼 Обычная девушка',
      text: 'Комфорт и независимость.',
      legend: 'Твоя свобода.'
    },
    {
      title: '🎓 Студентка',
      text: 'Дерзость и свежесть.',
      legend: 'Первый опыт.'
    }
  ]
};

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');
  const slidesContainer = document.getElementById('slides');
  slidesContainer.innerHTML = '';

  options[gender].forEach(opt => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <h2>${opt.title}</h2>
      <p>${opt.text}</p>
      <p style="font-size:0.9rem; opacity:0.7;">${opt.legend}</p>
      <button class="button" onclick="goToFinal()">Выбрать</button>
    `;
    slidesContainer.appendChild(slide);
  });

  document.getElementById('step2').classList.remove('hidden');

  new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
}

function goToFinal() {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

