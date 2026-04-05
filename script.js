const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const toast = document.getElementById('toast');
const langToggle = document.getElementById('langToggle');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    showToast('Англомовна версія позначена в макеті як майбутнє розширення сервісу.');
  });
}

function validateForm(form) {
  let valid = true;
  const fields = form.querySelectorAll('input[required], select[required]');

  fields.forEach((field) => {
    const errorBox = field.parentElement.querySelector('.error');
    if (errorBox) errorBox.textContent = '';

    if (!field.value.trim()) {
      valid = false;
      if (errorBox) errorBox.textContent = 'Заповніть це поле.';
      return;
    }

    if (field.type === 'text' && field.value.trim().length < 2) {
      valid = false;
      if (errorBox) errorBox.textContent = 'Введіть щонайменше 2 символи.';
      return;
    }

    if (field.name.toLowerCase().includes('contact')) {
      const value = field.value.trim();
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const looksLikePhone = /^[+()\d\s-]{7,}$/.test(value);
      if (!looksLikeEmail && !looksLikePhone) {
        valid = false;
        if (errorBox) errorBox.textContent = 'Введіть коректний телефон або email.';
      }
    }
  });

  return valid;
}

const forms = document.querySelectorAll('#bookingForm');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm(form)) {
      showToast('Будь ласка, перевірте форму.');
      return;
    }

    const selectedPlan = document.body.dataset.selectedPlan;
    const planText = selectedPlan ? ` Обраний тариф: ${selectedPlan}.` : '';
    showToast(`Заявку успішно надіслано.${planText}`);
    form.reset();
  });
});

const planButtons = document.querySelectorAll('[data-plan]');
planButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const plan = button.dataset.plan;
    document.body.dataset.selectedPlan = plan;
    const formSection = document.getElementById('demoForm');
    showToast(`Тариф ${plan} обрано. Тепер можете заповнити заявку.`);
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const today = new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.min = today;
});
