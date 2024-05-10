// 달력 그리기
function renderCalendar() {
  updateHeader();

  // 이전에 그려진 날짜 삭제
  grid.innerHTML = '';

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 해당 달의 첫 번째 날의 요일 가져오기
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // 날짜 추가
let dayIndex = 1;
for (let i = 0; i < 6; i++) { // 최대 6주까지 표시
  const weekRow = document.createElement('tr');
  for (let j = 0; j < 7; j++) {
    const day = document.createElement('td');
    if (i === 0 && j < firstDayOfMonth) {
      // 이번 달 시작일 이전의 빈 칸
      weekRow.appendChild(day);
    } else if (dayIndex <= daysInMonth) {
      // 이번 달 날짜 표시
      day.textContent = dayIndex;
      dayIndex++;
      weekRow.appendChild(day);
    } else {
      // 다음 달 시작일 이후의 빈 칸
      weekRow.appendChild(day);
    }
    day.classList.add('calendar-day');
    if (currentDate.getMonth() === new Date().getMonth() && day.textContent == new Date().getDate()) {
      day.classList.add('today'); // 오늘 날짜는 강조
    }
  }
  grid.appendChild(weekRow);
}
}