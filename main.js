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