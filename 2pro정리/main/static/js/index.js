  // 달력 컴포넌트를 초기화하는 함수
  function initCalendar() {
    const calendar = document.querySelector('.calendar');
    const header = calendar.querySelector('.calendar-header');
    const grid = calendar.querySelector('.calendar-grid tbody');
    const monthYear = header.querySelector('.month-year');
    const prevBtn = header.querySelector('.prev-month');
    const nextBtn = header.querySelector('.next-month');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function updateHeader() {
        const options = { month: 'long', year: 'numeric' };
        monthYear.textContent = currentDate.toLocaleDateString('ko-KR', options);
    }

    prevBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        currentDate = new Date(currentYear, currentMonth);
        renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        currentDate = new Date(currentYear, currentMonth);
        renderCalendar();
    });

    function renderCalendar() {
        updateHeader();
        grid.innerHTML = '';

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        let dayIndex = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const day = document.createElement('td');
                if (i === 0 && j < firstDayOfMonth) {
                    weekRow.appendChild(day);
                } else if (dayIndex <= daysInMonth) {
                    day.textContent = dayIndex;
                    day.dataset.date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayIndex).padStart(2, '0')}`;
                    day.addEventListener('click', () => {
                        window.location.href = `/main/html/createtodo.html?date=${day.dataset.date}`;
                    });

                    dayIndex++;
                    weekRow.appendChild(day);
                } else {
                    weekRow.appendChild(day);
                }
                day.classList.add('calendar-day');
                if (currentDate.getMonth() === new Date().getMonth() && day.textContent == new Date().getDate()) {
                    day.classList.add('today');
                }
            }
            grid.appendChild(weekRow);
        }
    }

    renderCalendar();
}

window.addEventListener('DOMContentLoaded', () => {
    initCalendar();
});