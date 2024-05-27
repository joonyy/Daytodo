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
document.getElementById("toggleAddScheduleForm").addEventListener("click", () => {
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
    const scheduleItem = createScheduleItem(eventName, eventContent, null); // 새로운 item에는 아직 id가 없다.
    
    // 일정 목록에 추가
    const scheduleList = document.getElementById("scheduleList");
    scheduleList.insertBefore(scheduleItem, scheduleList.firstChild);

    // 데이터 저장
    axios({
      method: "POST",
      url: "/addTodos",
      data: {
        "user_id": 1,
        "date": getSelectedDate(), 
        "todo_name": eventName,
        "description": eventContent
      }
    }).then(response => {
      // 서버에서 생성된 ID를 일정 ITEM에 할당한다.
      scheduleItem.id = `todo_${response.data.todo_id}`;
    }).catch(error => {
      console.error("일정 추가 중 오류가 발생했습니다:", error);
    });

    // 입력란 초기화
    document.getElementById("eventName").value = "";
    document.getElementById("eventContent").value = "";
  }
});

// 일정 아이템 생성 함수
function createScheduleItem(eventName, eventContent, eventId) {
  const scheduleItem = document.createElement("div");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  // 일정 아이템의 id 속성에 todo_id 할당
  if (eventId !== null) {
    scheduleItem.id = `todo_${eventId}`;
  }

  // 체크박스 상태 변경 처리
  checkBox.addEventListener("change", function () {
    if (this.checked) {
      scheduleText.classList.add("completed");
    } else {
      scheduleText.classList.remove("completed");
    }

    // 체크박스 상태 변경 시 PATCH 요청
    updateTodoState(eventId, this.checked);
  });

  // 일정 제목 생성 및 설정 (이벤트 이름)
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
    deleteTodoItem(eventId);
    
    // 일정 아이템을 삭제합니다.
    scheduleItem.remove();
  });
  buttonContainer.appendChild(deleteButton);

  // 수정 버튼을 생성하고 이벤트를 처리합니다.
  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.className = "edit-button";
  editButton.addEventListener("click", function () {
    // 기존 수정 폼을 제거
    const existingForm = document.getElementById("editScheduleForm");
    if (existingForm) {
      existingForm.remove();
    }

    // 수정 폼 생성
    const editForm = document.createElement("form");
    editForm.id = "editScheduleForm";

    const editEventName = document.createElement("input");
    editEventName.type = "text";
    editEventName.value = eventName;
    editForm.appendChild(editEventName);

    const editEventContent = document.createElement("textarea");
    editEventContent.value = eventContent;
    editForm.appendChild(editEventContent);

    const editSubmitButton = document.createElement("button");
    editSubmitButton.type = "submit";
    editSubmitButton.textContent = "수정하기";
    editForm.appendChild(editSubmitButton);

    // 기존 아이템을 숨기고 수정 폼을 표시
    scheduleItem.style.display = "none";
    scheduleItem.parentElement.insertBefore(editForm, scheduleItem);

    // 수정 폼 제출 이벤트 처리
    editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newEventName = editEventName.value.trim();
      const newEventContent = editEventContent.value.trim();
      
      if (newEventName !== "" || newEventContent !== "") {
        scheduleText.textContent = newEventName;
        scheduleContent.textContent = newEventContent;
        scheduleItem.style.display = "block";
        editForm.remove();
        updateTodoItem(eventId, newEventName, newEventContent);
      }
    });
    
    // 포커스를 제목 입력란으로 이동
    editEventName.focus();
  });
  buttonContainer.appendChild(editButton);

  scheduleItem.appendChild(buttonContainer);

  return scheduleItem;
}

// 백엔드에서 전달된 데이터로 일정 렌더링
function renderTodoInDate(todos) {
  const scheduleList = document.getElementById("scheduleList");
  todos.forEach(todo => {
    const scheduleItem = createScheduleItem(todo.todo_name, todo.description, todo.todo_id);
    if (todo.state) {
      scheduleItem.querySelector('input[type="checkbox"]').checked = true;
      scheduleItem.querySelector('span').classList.add("completed");
    }
    scheduleList.appendChild(scheduleItem);
  });
}

// back에서 받아온 데이터를 활용하여 렌더해준다.
const hiddenTodosElement = document.getElementById('todoData');
const todos = JSON.parse(hiddenTodosElement.textContent);
renderTodoInDate(todos);

// 체크박스 상태 변경 시 서버에 PATCH 요청하여 todo의 상태 업데이트
function updateTodoState(todoId, newState) {
  axios({
    method: "PATCH",
    url: "/toggleTodo",
    data: {
      todo_id: todoId,
      state: newState
    }
  })
  .then(response => {
    console.log("일정 상태가 성공적으로 업데이트되었습니다.");
  })
  .catch(error => {
    console.error("일정 상태 업데이트 중 오류가 발생했습니다:", error);
  });
}

// 일정 삭제 요청 보내는 함수
function deleteTodoItem(todoId) {
  axios.delete('/deleteTodos', {
    data: {
      todo_id: todoId
    }
  })
  .then(response => {
    console.log("일정이 성공적으로 삭제되었습니다.");
  })
  .catch(error => {
    console.error("일정 삭제 중 오류가 발생했습니다:", error);
  });
}

// 일정 수정 요청 보내는 함수
function updateTodoItem(todoId, newEventName, newEventContent) {
  axios({
    method: "PATCH",
    url: "/updateTodos",
    data: {
      todo_id: todoId,
      todo_name: newEventName,
      description: newEventContent
    }
  })
  .then(response => {
    console.log("일정이 성공적으로 수정되었습니다.");
  })
  .catch(error => {
    console.error("일정 수정 중 오류가 발생했습니다:", error);
  });
}
