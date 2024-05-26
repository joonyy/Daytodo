// 선택된 날짜 가져오기
function getSelectedDate() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('date');
}

// 현재 날짜 표시
function displayCurrentDate() {
  const selectedDate = getSelectedDate();
  const currentDate = new Date(selectedDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
  document.getElementById('currentDate').textContent = formattedDate;
}
// 현재 날짜 표시 함수 호출
displayCurrentDate();

// 일정 추가 폼 열기/닫기 토글
document.getElementById("toggleAddScheduleForm").addEventListener("click", ()=> {
  document.getElementById("addScheduleForm").classList.toggle("hide");

  // 폼이 열려 있으면 이벤트 이름 입력란에 포커스 설정
  if (!document.getElementById("addScheduleForm").classList.contains("hide")) {
    document.getElementById("eventName").focus();
  }
});

// 일정 추가 폼 제출 처리
document.getElementById("addScheduleForm").addEventListener("submit", function (event) {
  // 기본 제출 동작 막기
  event.preventDefault();

  // 입력된 이벤트 이름 가져오기
  const eventName = document.getElementById("eventName").value.trim();
  // 입력된 이벤트 내용 가져오기
  const eventContent = document.getElementById("eventContent").value.trim();

  // 입력된 이벤트 이름이나 내용이 비어있지 않은 경우
  if (eventName !== "" || eventContent !== "") {
    // 일정 아이템 생성
    const scheduleItem = createScheduleItem(eventName, eventContent);
    
    // 일정 목록에 추가
    const scheduleList = document.getElementById("scheduleList");
    scheduleList.insertBefore(scheduleItem, scheduleList.firstChild);

    //데이터 저장
    axios({
      method:"POST",
      url:"/addTodos",
      data:{
        "user_id": 1,
        "date": getSelectedDate(), 
        "todo_name": eventName,
        "description": eventContent
      }
    })
  
    // 입력란 초기화
    document.getElementById("eventName").value = "";
    document.getElementById("eventContent").value = "";
  }
});

// 일정 아이템 생성 함수
function createScheduleItem(eventName, eventContent) {
  const scheduleItem = document.createElement("div");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  // 체크박스 상태 변경 처리
  checkBox.addEventListener("change", function () {
    if (this.checked) {
      scheduleText.classList.add("completed");
    } else {
      scheduleText.classList.remove("completed");
    }
  });

  // 일정 텍스트 생성 및 설정 (이벤트 이름)
  const scheduleText = document.createElement("span");
  scheduleText.textContent = eventName;
  scheduleItem.appendChild(checkBox);
  scheduleItem.appendChild(scheduleText);
  scheduleItem.className = "schedule-item";

  // 일정 내용 생성 및 설정 (이벤트 내용)
  const scheduleContent = document.createElement("p");
  scheduleContent.textContent = eventContent;
  scheduleItem.appendChild(scheduleContent);
  
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // 삭제 버튼 생성 및 이벤트 처리
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", function () {
    // axios.delete 요청
    // axios.delete('/deleteTodo', {
    //   data:{
    //     todos_id :,
    //     user_id :
    //   }
    // })
    
    // 일정 아이템을 삭제합니다.
    scheduleItem.remove();
  });
  buttonContainer.appendChild(deleteButton);

  // 수정 버튼을 생성하고 이벤트를 처리합니다.
  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function () {
    const newText = prompt("일정을 수정하세요", scheduleText.textContent);
    if (newText !== null) {
      scheduleText.textContent = newText;
    }
  });
  buttonContainer.appendChild(editButton);

  scheduleItem.appendChild(buttonContainer);

  return scheduleItem;
}

// 백엔드에서 전달된 데이터로 일정 렌더링
function renderTodoInDate(todos) {
  const scheduleList = document.getElementById("scheduleList");
  todos.forEach(todo => {
    const scheduleItem = createScheduleItem(todo.todo_name, todo.description);
    scheduleList.appendChild(scheduleItem);
  });
}

//back에서 받아온 데이터를 활용하여 렌더해준다.
const hiddenTodosElement = document.getElementById('todoData');
const todos = JSON.parse(hiddenTodosElement.textContent);
renderTodoInDate(todos);
