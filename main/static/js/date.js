// date.js

function getSelectedDate() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDate = urlParams.get('date');
  
  // 만약 선택된 날짜가 없다면 오늘 날짜를 반환
  return selectedDate ? selectedDate : new Date().toISOString().slice(0, 10);
}

// 현재 날짜 표시 함수
function displayCurrentDate() {
  const selectedDate = getSelectedDate();
  const currentDate = new Date(selectedDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
  document.getElementById('currentDate').textContent = formattedDate;
}

displayCurrentDate();

document.getElementById("toggleAddScheduleForm").addEventListener("click", function () {
  document.getElementById("addScheduleForm").classList.toggle("hide");

  if (!document.getElementById("addScheduleForm").classList.contains("hide")) {
    document.getElementById("eventName").focus();
  }
});

document.getElementById("addScheduleForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const eventName = document.getElementById("eventName").value.trim();

  if (eventName !== "") {
    const scheduleItem = document.createElement("div");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", function () {
      if (this.checked) {
        scheduleText.classList.add("completed");
      } else {
        scheduleText.classList.remove("completed");
      }
    });
    const scheduleText = document.createElement("span");
    scheduleText.textContent = eventName;
    scheduleItem.appendChild(checkBox);
    scheduleItem.appendChild(scheduleText);
    scheduleItem.className = "schedule-item";

    const editButton = document.createElement("button"); // 수정 버튼 추가
    editButton.textContent = "수정"; // 수정 버튼 텍스트
    editButton.className = "edit-button"; // 수정 버튼 클래스
    editButton.addEventListener("click", function () { // 수정 버튼 클릭 이벤트
      const newText = prompt("일정을 수정하세요", scheduleText.textContent); // 새로운 텍스트를 입력 받음
      if (newText !== null) {
        scheduleText.textContent = newText; // 일정 텍스트 업데이트
      }
    });
    scheduleItem.appendChild(editButton); // 수정 버튼 추가

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      scheduleItem.remove();
    });
    scheduleItem.appendChild(deleteButton);

    const scheduleList = document.getElementById("scheduleList");
    scheduleList.insertBefore(scheduleItem, scheduleList.firstChild);

    document.getElementById("eventName").value = "";
  }
});
