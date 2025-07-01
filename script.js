let selectedGender = '';
let swiper;

const options = {
  'Мужчина': [
    { title: 'Предприниматель', text: 'Премиум, скорость, стиль.' },
    { title: 'Семьянин', text: 'Комфорт и надёжность.' },
    { title: 'Студент', text: 'Первая машина — свобода.' }
  ],
  'Женщина': [
    { title: 'Бизнес-леди', text: 'Энергия и уверенность.' },
    { title: 'Обычная девушка', text: 'Свобода и комфорт.' },
    { title: 'Студентка', text: 'Стиль и независимость.' }
  ]
};

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');
  const container = document.getElementById('options');
  container.innerHTML = '';

  options[gender].forEach(opt => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="card">
        <h2>${opt.title}</h2>
        <p>${opt.text}</p>
        <button class="button" onclick="selectCharacter()">Выбрать</button>
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

function selectCharacter() {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}


