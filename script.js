let selectedGender = '';
let currentOption = null;

const options = {
  'Мужчина': [
    {
      title: 'Предприниматель',
      text: 'Премиум и скорость.',
      legend: 'Выбираешь статус и драйв.'
    },
    {
      title: 'Обычный парень',
      text: 'Комфорт и немного скорости.',
      legend: 'Надёжность и удобство.'
    },
    {
      title: 'Студент',
      text: 'Первая машина.',
      legend: 'Свобода и новые впечатления.'
    }
  ],
  'Женщина': [
    {
      title: 'Бизнес-леди',
      text: 'Стиль и уверенность.',
      legend: 'Твой имидж важен.'
    },
    {
      title: 'Обычная девушка',
      text: 'Комфорт и независимость.',
      legend: 'Авто под твой ритм.'
    },
    {
      title: 'Студентка',
      text: 'Начало пути.',
      legend: 'Твоя свобода.'
    }
  ]
};

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');

  const wrapper = document.getElementById('swiperWrapper');
  wrapper.innerHTML = '';

  options[gender].forEach((opt, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <h2>${opt.title}</h2>
      <p>${opt.text}</p>
    `;
    slide.onclick = () => currentOption = opt;
    wrapper.appendChild(slide);
  });

  document.getElementById('step2').classList.remove('hidden');

  new Swiper('.swiper', {
    slidesPerView: 1.2,
    spaceBetween: 15,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

function goToStep3() {
  if (!currentOption) {
    alert('Пожалуйста, выберите персонажа.');
    return;
  }
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('characterTitle').innerText = currentOption.title;
  document.getElementById('characterDescription').innerText = currentOption.text;
  document.getElementById('characterLegend').innerText = currentOption.legend;
  document.getElementById('step3').classList.remove('hidden');
}

function goToFinal() {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

