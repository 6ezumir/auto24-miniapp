let selectedGender = '';

    const options = {
      'Мужчина': [
        {
          label: '💼 Предприниматель',
          title: 'Ты — Предприниматель',
          text: 'Премиум, скорость, и возможность делать грязь на дороге. В бизнес-костюме или в спортивках — ты всегда на стиле.',
          legend: 'Ты знаешь цену времени, и хочешь авто, которое подчеркнёт твою мощь на дороге. Алекс уже подобрал варианты под твой статус.'
        },
        {
          label: '🧘‍♂️ Семьянин / обычный парень',
          title: 'Ты — Обычный парень',
          text: 'Гармония на дороге важна, но иногда хочется обогнать самолет. Комфорт и драйв — твой баланс.',
          legend: 'Семья — в приоритете. Тебе нужно надёжное, удобное авто. Но чтобы мог и нажать, когда дорога зовёт.'
        },
        {
          label: '🎓 Студент',
          title: 'Ты — Студент',
          text: 'Автобус — это прекрасно, но лицезреть чужие физиономии каждый день — уже не твоё. Время пересесть на что-то своё.',
          legend: 'Твоя первая машина — не просто средство передвижения. Это — свобода, взрослая жизнь и свежий воздух в лицо.'
        }
      ],
      'Женщина': [
        {
          label: '👠 Бизнес-леди',
          title: 'Ты — Бизнес-леди',
          text: 'Ярко-красная тачка, бокал Cabernet Sauvignon 1992 и деловые встречи на скорости. Ты знаешь себе цену.',
          legend: 'Тебе нужно авто, которое подчёркивает твою уверенность. Алекс уже знает, что подойдёт.'
        },
        {
          label: '👩‍🍼 Обычная девушка',
          title: 'Ты — Обычная девушка',
          text: 'Он отвезёт детей в школу, но ты хочешь свою свободу. Второе авто? Почему нет, если он оплатит 😉',
          legend: 'Ты не ждёшь, пока тебя подвезут. Ты знаешь, что достойна собственного выбора. Алекс уже нашёл тебе пару вариантов.'
        },
        {
          label: '🎓 Студентка',
          title: 'Ты — Студентка',
          text: 'Свежие права, большие амбиции и понимание, что красная отсечка на жиге — это не про стабильность.',
          legend: 'Ты хочешь стильное, уверенное авто, чтобы ездить сама и чувствовать себя комфортно. Алекс уже подсуетился.'
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
  </script>
