// HTML에서 필요한 요소들을 선택합니다.
const calendar = document.querySelector('.calendar'); // 달력을 감싸는 부모 요소
const header = calendar.querySelector('.calendar-header'); // 달력 헤더
const grid = calendar.querySelector('.calendar-grid tbody'); // 달력 그리드의 tbody 요소
const monthYear = header.querySelector('.month-year'); // 연도와 월을 표시하는 요소

// 현재 선택된 날짜 정보를 저장하는 변수들입니다.
let chosenDate = new Date();
const stringDate = dateToStringDate(chosenDate);
let chosenMonth = chosenDate.getMonth(); // 선택된 달
let chosenYear = chosenDate.getFullYear(); // 선택된 연도

let firstDate, lastDate, daysInMonth, firstDayOfMonth, lastDayOfMonth, weekCount;

// 선택된 날짜에 해당하는 할 일을 서버에서 가져와 달력에 표시하는 함수입니다.
const handleChosenDate = () => {
  userId = 1;
  axios({
    method: "GET",
    url: "/getThisMonthTodos",
    params: {
      userId: userId,
      date: stringDate
    }
  })
  .then(res => {
    const todos = res.data;
    console.log("서버에서 받아온 todos : ", todos);

    // 달력의 각 날짜(td 요소)를 선택합니다.
    const tdElements = document.querySelectorAll('td');

    // 받아온 할 일을 반복하고, 각 날짜에 할 일을 추가합니다.
    todos.forEach(todo => {
      const targetTd = Array.from(tdElements).find(td => parseInt(td.getAttribute('data-date')) === todo.day);
      // 날짜와 일치하는 요소가 있다면
      if (targetTd) {
        const todoText = document.createTextNode(todo.todo_name);
        const todoDiv = document.createElement('div');
        // 해당 날짜에 할 일을 추가합니다.
        todoDiv.appendChild(todoText);
        targetTd.appendChild(todoDiv);
      }
    });
  })
  .catch(err => {
    console.error("할 일을 받지 못했어요 : ", err);
  })
}

// 달력을 그리는 함수입니다.
const renderCalendar = () => {
  // 선택된 달의 첫째 날과 마지막 날, 해당 달의 일 수, 첫째 날의 요일, 마지막 날의 요일, 주 수를 계산합니다.
  firstDate = new Date(chosenYear, chosenMonth, 1); 
  lastDate = new Date(chosenYear, chosenMonth + 1, 0); 
  daysInMonth = lastDate.getDate(); 
  firstDayOfMonth = firstDate.getDay(); 
  lastDayOfMonth = lastDate.getDay(); 
  weekCount = (firstDayOfMonth + daysInMonth) % 7 === 0 ? Math.floor((firstDayOfMonth + daysInMonth) / 7) : Math.floor(((firstDayOfMonth + daysInMonth) / 7)) + 1;

  // 헤더에 선택된 연도와 달을 표시합니다.
  monthYear.textContent = `${chosenYear} 년 ${chosenMonth + 1} 월`;

  // 그리드를 초기화합니다.
  grid.innerHTML = '';

  // 오늘 날짜를 가져옵니다.
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
            cell.setAttribute('data-date', dayIndex); // 각 날짜에 대한 데이터 속성을 추가합니다.
            // 클릭 이벤트를 추가하여 날짜를 클릭하면 해당 날짜의 상세 페이지로 이동합니다.
            cell.addEventListener('click', (event) => {
              const target = event.target.closest('td');
              const clickedDate = parseInt(target.getAttribute('data-date'));
              console.log(clickedDate);
              //클릭한 날짜에 해당하는 date객체를 만듭니다
              const tmp = new Date(chosenYear, chosenMonth,clickedDate);
              const newDate = dateToStringDate(tmp);
              userId = 1;

              const queryString = `userId=${userId}&date=${newDate}`;
              window.location.href=`/date?${queryString}`;
            });
            // 오늘 날짜를 강조합니다.
            if (chosenYear === today.getFullYear() && chosenMonth === today.getMonth() && dayIndex === today.getDate()) {
              cell.style.backgroundColor = 'rgba(0, 0, 250, 0.1)';
            }
          }
          row.appendChild(cell);
      }
      grid.appendChild(row);
  }
  // 선택된 날짜에 해당하는 할 일을 처리합니다.
  handleChosenDate();
}

// 이전 달로 이동하는 함수입니다.
const previousMonth = () => {
  chosenMonth--;
  if (chosenMonth < 0) {
    chosenMonth = 11;
    chosenYear--;
  }
  renderCalendar();
}

// 다음 달로 이동하는 함수입니다.
const nextMonth = () => {
  chosenMonth++;
  if (chosenMonth > 11) {
    chosenMonth = 0;
    chosenYear++;
  }
  renderCalendar();
}

// 최초 실행 시 달력을 그립니다.
renderCalendar();