// 달력 컴포넌트를 초기화하는 함수
function initCalendar() {
  const calendar = document.querySelector('.calendar');
  const header = calendar.querySelector('.calendar-header');
  const grid = calendar.querySelector('.calendar-grid tbody');
  const monthYear = header.querySelector('.month-year');

  let chosenDate = new Date();
  let chosenMonth = chosenDate.getMonth();
  let chosenYear = chosenDate.getFullYear();
  let firstDate, lastDate, daysInMonth, firstDayOfMonth, lastDayOfMonth, weekCount;

  const handleChosenDate = () =>{
    const userId = 1;
    const year = chosenYear;
    const month = chosenMonth +1;
  
    axios({
      method:"GET",
      url:"/getThisMonthTodos",
      params:{
        userId:userId,
        year:year,
        month:month,
      }
    })
    .then(res =>{
      const todos = res.data;
      console.log("서버에서 받아온 todos : ",todos);
  
      //모든 td를 선택한다.
      const tdElements = document.querySelectorAll('td');
  
      //받아온 일정이 반복하고, 
      todos.forEach(todo =>{
        const targetTd = Array.from(tdElements).find(td => parseInt(td.getAttribute('data-date')) === todo.day);
        //날짜와 일치하는 속성이 있다면
        if(targetTd){
          
          const todoText = document.createTextNode(todo.todo_name);
          const todoDiv = document.createElement('div');
          //해당 날짜에 일정을 추가
          todoDiv.appendChild(todoText);
          targetTd.appendChild(todoDiv);
        }
      });
    })
    .catch(err =>{
      console.error("todos를 받지 못했어요 : ",err);
    })
  }

  const previousMonth = () =>{
    chosenMonth--;
    if(chosenMonth < 0){
      chosenMonth = 11;
      chosenYear--;
    }
  
    renderCalendar();
  }

//
  const nextMonth = () => {
    chosenMonth++;
    if (chosenMonth > 11) {
      chosenMonth = 0;
      chosenYear++;
    }
    renderCalendar();
  }

  const renderCalendar = () => {
      monthYear.textContent = `${chosenYear} 년 ${chosenMonth + 1} 월`;

      grid.innerHTML = '';

      const daysInMonth = new Date(chosenYear, chosenMonth + 1, 0).getDate();
      const firstDayOfMonth = new Date(chosenYear, chosenMonth, 1).getDay();

    dayIndex = 1;
      for (let i = 0; i < 6; i++) {
          const weekRow = document.createElement('tr');
          for (let j = 0; j < 7; j++) {
              const day = document.createElement('td');
              if (i === 0 && j < firstDayOfMonth) {
                  weekRow.appendChild(day);
              } else if (dayIndex <= daysInMonth) {
                  day.textContent = dayIndex;
                  day.dataset.date = `${chosenYear}-${String(chosenMonth + 1).padStart(2, '0')}-${String(dayIndex).padStart(2, '0')}`;
                  day.addEventListener('click', () => {
                      window.location.href = `/main/html/createtodo.html?date=${day.dataset.date}`;
                  });

                  dayIndex++;
                  weekRow.appendChild(day);
              } else {
                  weekRow.appendChild(day);
              }
              day.classList.add('calendar-day');
              if (chosenDate.getMonth() === new Date().getMonth() && day.textContent == new Date().getDate()) {
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