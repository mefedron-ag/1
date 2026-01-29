document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('parallax-bg');

    window.addEventListener('mousemove', (e) => {
        // Получаем координаты мыши
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Рассчитываем смещение (чем больше число 30, тем сильнее движение)
        const moveX = (x - 0.5) * 30; 
        const moveY = (y - 0.5) * 30;
        
        // Применяем трансформацию
        bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // --- Scroll Reveal Animation ---
    // Находим все карточки и секции, которые нужно анимировать
    const revealElements = document.querySelectorAll('.glass-card, .section-title, .btn-primary, .team-card');

    // Добавляем класс 'reveal' всем элементам сразу, чтобы скрыть их изначально
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Отступ снизу экрана, когда начинать анимацию

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Слушаем скролл
    window.addEventListener('scroll', revealOnScroll);
    
    // Запускаем один раз при загрузке, чтобы показать элементы, которые уже видны
    revealOnScroll();

    // --- 3D Tilt Effect для карточек (опционально для "сочности") ---
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Вычисляем поворот
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Сброс при уходе курсора
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });
});

// Вставь свои данные сюда
const TG_TOKEN = "8306395185:AAH04mLgczytb2rv_qUIks-vktY7Dhk1u_8";
const TG_CHAT_ID = "6516537861";

document.getElementById('applyForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Собираем данные из полей
    const job = document.getElementById('jobTitleInput').value;
    const name = this.querySelector('input[placeholder="Ваше Имя"]').value;
    const contact = this.querySelector('input[placeholder="Telegram"]').value;
    const bio = this.querySelector('textarea').value;

    // 2. Формируем красивый текст для Telegram
    const fullMessage = `
🚀 **Новая заявка в Mefedron AG**
━━━━━━━━━━━━━━━━━━
💼 **Вакансия:** ${job}
👤 **Имя:** ${name}
📱 **Контакт:** ${contact}
📝 **О себе:** ${bio}
━━━━━━━━━━━━━━━━━━
    `;

    // 3. Отправляем запрос
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            parse_mode: 'Markdown',
            text: fullMessage
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Заявка успешно отправлена в центр управления!');
            closeForm(); // Закрываем модальное окно
            this.reset(); // Очищаем поля
        } else {
            alert('Произошла ошибка при отправке. Попробуйте позже.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ошибка сети. Проверьте подключение.');
    });
});