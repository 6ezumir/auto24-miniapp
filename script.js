let selectedGender = '';

const options = {
  'Мужчина': [
    {
      title: '💼 Предприниматель',
      text: 'Премиум, скорость и статус.',
      legend: 'Авто, которое подчеркнёт твою силу и уверенность.'
    },
    {
      title: '🧘‍♂️ Обычный парень',
      text: 'Комфорт и драйв в балансе.',
      legend: 'Надёжная машина для семьи и себя.'
    },
    {
      title: '🎓 Студент',
      text: 'Автобус — не твоё.',
      legend: 'Первая машина — свобода и взрослая жизнь.'
    }
  ],
  'Женщина': [
    {
      title: '👠 Бизнес-леди',
      text: 'Яркая тачка и встречи.',
      legend: 'Авто, что подчеркивает твой характер и стиль.'
    },
    {
      title: '👩‍🍼 Обычная девушка',
      text: 'Свобода и своё авто.',
      legend: 'Ты достойна выбирать то, что подходит именно тебе.'
    },
    {
      title: '🎓 Студентка',
      text: 'Права и большие планы',
      legend: 'Машина, чтобы ездить самой и чувствовать уверенность.'
    }
  ]
};

function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('step1').classList.add('hidden');
  const container = document.getElementById('options');
  container.innerHTML = '';
  options[gender].forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = opt.label;
    btn.onclick = () => selectCharacter(opt);
    container.appendChild(btn);
  });
  document.getElementById('step2').classList.remove('hidden');
}

function selectCharacter(option) {
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('characterTitle').innerText = option.title;
  document.getElementById('characterDescription').innerText = option.text;
  document.getElementById('characterLegend').innerText = option.legend;
  document.getElementById('step3').classList.remove('hidden');
}

function goToFinal() {
  document.getElementById('step3').classList.add('hidden');
  document.getElementById('final').classList.remove('hidden');
}

function goToBot() {
  window.location.href = "https://t.me/auto24serviceofficial_bot";
}

