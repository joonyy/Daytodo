const calendar = document.querySelector('.calendar');
const header = calendar.querySelector('.calendar-header');
const grid = calendar.querySelector('.calendar-grid tbody');
const monthYear = header.querySelector('.month-year');

let chosenDate = new Date();
let chosenMonth = chosenDate.getMonth();
let chosenYear = chosenDate.getFullYear();
let firstDate, lastDate, daysInMonth, firstDayOfMonth, lastDayOfMonth, weekCount;

const handleChosenDate = () => {
  const userId = 1;
  const year = chosenYear;
  const month = chosenMonth + 1;

  axios({
    method: "GET",
    url: "/getThisMonthTodos",
    params: {
      userId: userId,
      year: year,
      month: month,
    }
  })
  .then(res => {
    const todos = res.data;
    console.log("서버에서 받아온 todos : ", todos);

    // 모든 td를 선택한다.
    const tdElements = document.querySelectorAll('td');

    // 받아온 일정을 반복하고,
    todos.forEach(todo => {
      const targetTd = Array.from(tdElements).find(td => parseInt(td.getAttribute('data-date')) === todo.day);
      // 날짜와 일치하는 속성이 있다면
      if (targetTd) {
        const todoText = document.createTextNode(todo.todo_name);
        const todoDiv = document.createElement('div');
        // 해당 날짜에 일정을 추가
        todoDiv.appendChild(todoText);
        targetTd.appendChild(todoDiv);
      }
    });
  })
  .catch(err => {
    console.error("todos를 받지 못했어요 : ", err);
  })
}

const renderCalendar = () => {
  firstDate = new Date(chosenYear, chosenMonth, 1); // 선택된 달 첫날. 일 정보
  lastDate = new Date(chosenYear, chosenMonth + 1, 0); // 선택된 달 마지막 날 일 정보
  daysInMonth = lastDate.getDate(); // 이번달 일 수(마지막 일)
  firstDayOfMonth = firstDate.getDay(); // 첫째 날의 요일 출력. (0 : 일요일, 1 : 월요일)
  lastDayOfMonth = lastDate.getDay(); // 마지막 날의 요일 출력.
  weekCount = (firstDayOfMonth + daysInMonth) % 7 === 0 ? Math.floor((firstDayOfMonth + daysInMonth) / 7) : Math.floor(((firstDayOfMonth + daysInMonth) / 7)) + 1;

  monthYear.textContent = `${chosenYear} 년 ${chosenMonth + 1} 월`;

  grid.innerHTML = '';

  // 현재 날짜를 가져오기 위해
  const today = new Date();

  let dayIndex = 0;
  for (let i = 0; i < weekCount; i++) {
      const row = document.createElement('tr');
      for (let j = 1; j <= 7; j++) {
          let cell = document.createElement('td');
          if (!(i * 7 + j < firstDayOfMonth + 1 || dayIndex >= daysInMonth)) {
            dayIndex++;
            let cellContent = document.createElement("div");
            cellContent.textContent = dayIndex;
            cellContent.classList.add("dates");
            cell.appendChild(cellContent);
            cell.setAttribute('data-date', dayIndex); // 날짜 데이터 추가
            // 클릭 이벤트 추가
            cell.addEventListener('click', (event) => {
              const target = event.target.closest('td');
              const clickedDate = parseInt(target.getAttribute('data-date'));
              const url = `/date?year=${chosenYear}&month=${chosenMonth + 1}&date=${clickedDate}`;
              window.location.href = url;
            });
            // 오늘 날짜를 강조하는 조건 추가
            if (chosenYear === today.getFullYear() && chosenMonth === today.getMonth() && dayIndex === today.getDate()) {
              cell.style.backgroundColor = 'rgba(0, 0, 250, 0.1)';
            }
          }
          row.appendChild(cell);
      }
      grid.appendChild(row);
  }
  handleChosenDate();
}

const previousMonth = () => {
  chosenMonth--;
  if (chosenMonth < 0) {
    chosenMonth = 11;
    chosenYear--;
  }
  renderCalendar();
}

const nextMonth = () => {
  chosenMonth++;
  if (chosenMonth > 11) {
    chosenMonth = 0;
    chosenYear++;
  }
  renderCalendar();
}

// 최초입장 시 달력 출력.
renderCalendar();
