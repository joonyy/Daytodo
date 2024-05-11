// 달력 컴포넌트를 초기화하는 함수
function initCalendar() {
    const calendar = document.querySelector('.calendar');
    const header = calendar.querySelector('.calendar-header');
    const grid = calendar.querySelector('.calendar-grid');
    const monthYear = header.querySelector('.month-year');
    const prevBtn = header.querySelector('.prev-month');
    const nextBtn = header.querySelector('.next-month');
  
    let currentDate = new Date(); // 현재 날짜 가져오기
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
  
    // 달력 헤더에 현재 연도와 월 표시
    function updateHeader() {
      const options = { month: 'long', year: 'numeric' };
      monthYear.textContent = currentDate.toLocaleDateString('en-US', options);
    }
  
    // 이전 달로 이동
    prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      currentDate = new Date(currentYear, currentMonth);
      renderCalendar();
    });
  
    // 다음 달로 이동
    nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      currentDate = new Date(currentYear, currentMonth);
      renderCalendar();
    });
  
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
      let weeksRendered = 0;
      for (let i = 0; i < 6; i++) { // 최대 6주까지 표시
        const weekRow = document.createElement('tr');
        let rendered = false; // 날짜를 하나 이상 렌더링했는지 여부
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
            rendered = true;
          } else {
            // 다음 달 시작일 이후의 빈 칸
            weekRow.appendChild(day);
          }
          day.classList.add('calendar-day');
          if (currentDate.getMonth() === new Date().getMonth() && day.textContent == new Date().getDate()) {
            day.classList.add('today'); // 오늘 날짜는 강조
          }
        }
        if (rendered) {
          grid.appendChild(weekRow);
          weeksRendered++;
        }
      }
  
      // 마지막 줄이 모두 빈 칸이라면 삭제
      if (weeksRendered === 0) {
        grid.innerHTML = '';
      }
    }
  
    // 초기화
    renderCalendar();
  }
  
  // 페이지 로드 시 달력 컴포넌트 초기화
  window.addEventListener('DOMContentLoaded', () => {
    initCalendar();
  });
  