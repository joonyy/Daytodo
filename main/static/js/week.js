// 주간 캘린더를 관리하는 JavaScript 코드
const prevWeekBtn = document.querySelector('.prev-week-btn');
const nextWeekBtn = document.querySelector('.next-week-btn');
let currentStartDate = new Date();
currentStartDate.setHours(0, 0, 0, 0); // Set time to start of day for accurate comparison
while (currentStartDate.getDay() !== 0) {
    currentStartDate.setDate(currentStartDate.getDate() - 1); // Move back to Sunday
}
const calendarBody = document.querySelector('.calendar-grid tbody');
const weekDatesRow = document.querySelector('.week-dates');

function renderWeeklyCalendar(startDate) {
    calendarBody.innerHTML = '';
    const endOfWeek = new Date(startDate);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    const startOfWeekDay = startDate.getDate();
    const endOfWeekDay = endOfWeek.getDate();

    let currentDay = new Date(startDate);
    const today = new Date(); // 오늘 날짜를 확인
    const weekDates = weekDatesRow.children;
    for (let i = 0; i < 7; i++) {
        // 요일을 가져옵니다.
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDay.getDay()];
        // 요일과 날짜를 표시합니다.
        weekDates[i].innerHTML = `${currentDay.getDate()}일 &#40; ${dayOfWeek} &#41;`;
        currentDay.setDate(currentDay.getDate() + 1);
    }

    currentDay = new Date(startDate);
    while (currentDay <= endOfWeek) {
        const row = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const cell = document.createElement('td');
            cell.textContent = currentDay.getDate();
            if (currentDay.toDateString() === today.toDateString()) {
                cell.style.backgroundColor = 'rgba(0, 0, 250, 0.1)';
            }
            cell.addEventListener('click', (event) => {
                const clickedDate = event.currentTarget.textContent;
                const month = currentDay.getMonth() + 1;
                const year = currentDay.getFullYear();
                const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${clickedDate.padStart(2, '0')}`;
                window.location.href = `/date.ejs?date=${formattedDate}`;
            });
            row.appendChild(cell);
            currentDay.setDate(currentDay.getDate() + 1);
        }
        calendarBody.appendChild(row);
    }

    const weekRangeText = `${startDate.getMonth() + 1}/${startOfWeekDay} - ${endOfWeek.getMonth() + 1}/${endOfWeekDay}`;
    document.querySelector('.week-range').textContent = weekRangeText;
}

renderWeeklyCalendar(currentStartDate);

prevWeekBtn.addEventListener('click', () => {
    currentStartDate.setDate(currentStartDate.getDate() - 7);
    renderWeeklyCalendar(currentStartDate);
});

nextWeekBtn.addEventListener('click', () => {
    currentStartDate.setDate(currentStartDate.getDate() + 7);
    renderWeeklyCalendar(currentStartDate);
});

function nextWeek() {
    currentStartDate.setDate(currentStartDate.getDate() + 7);
    renderWeeklyCalendar(currentStartDate);
}
function previousWeek() {
    currentStartDate.setDate(currentStartDate.getDate() - 7);
    renderWeeklyCalendar(currentStartDate);
}