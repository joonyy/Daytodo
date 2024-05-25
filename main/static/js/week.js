document.addEventListener('DOMContentLoaded', (event) => {
  const prevWeekBtn = document.querySelector('#prev-week-btn');
  const nextWeekBtn = document.querySelector('#next-week-btn');

  let currentStartDate = new Date();
  currentStartDate.setHours(0, 0, 0, 0);

  while (currentStartDate.getDay() !== 0) {
      currentStartDate.setDate(currentStartDate.getDate() - 1);
  }

  const calendarBody = document.querySelector('.calendar-grid tbody');
  const weekDatesRow = document.querySelector('.week-dates');

  function renderWeeklyCalendar(startDate) {
      calendarBody.innerHTML = '';

      const endOfWeek = new Date(startDate);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      let currentDay = new Date(startDate);
      const today = new Date();
      
      const weekDates = weekDatesRow.children;
      for (let i = 0; i < 7; i++) {
          const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDay.getDay()];
          weekDates[i].innerHTML = `${currentDay.getDate()}일 &#40; ${dayOfWeek} &#41;`;
          currentDay.setDate(currentDay.getDate() + 1);
      }

      currentDay = new Date(startDate);
      while (currentDay <= endOfWeek) {
          const row = document.createElement('tr');
          
          for (let i = 0; i < 7; i++) {
              const cell = document.createElement('td');
              const year = currentDay.getFullYear();
              const month = (currentDay.getMonth() + 1).toString().padStart(2, '0');
              const day = currentDay.getDate().toString().padStart(2, '0');
              const dateString = `${year}-${month}-${day}`;
              cell.textContent = currentDay.getDate();
              cell.setAttribute('data-date', dateString); // "nnnn-nn-nn" 형식으로 날짜 데이터 속성 추가
              
              if (currentDay.toDateString() === today.toDateString()) {
                  cell.style.backgroundColor = 'rgba(0, 0, 250, 0.1)';
              }

              cell.addEventListener('click', (event) => {
                  const target = event.target.closest('td');
                  const clickedDate = target.getAttribute('data-date');
                  window.location.href = `/date?date=${clickedDate}`;
              });

              row.appendChild(cell);
              currentDay.setDate(currentDay.getDate() + 1);
          }
          calendarBody.appendChild(row);
      }

      const weekRangeText = `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`;
      document.querySelector('.week-range').textContent = weekRangeText;
  }

  function nextWeek() {
      const newDate = new Date(currentStartDate);
      newDate.setDate(newDate.getDate() + 7);
      currentStartDate = newDate;
      renderWeeklyCalendar(currentStartDate);
  }

  function previousWeek() {
      const newDate = new Date(currentStartDate);
      newDate.setDate(newDate.getDate() - 7);
      currentStartDate = newDate;
      renderWeeklyCalendar(currentStartDate);
  }

  prevWeekBtn.addEventListener('click', previousWeek);
  nextWeekBtn.addEventListener('click', nextWeek);

  renderWeeklyCalendar(currentStartDate);
});
