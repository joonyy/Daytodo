// 현재 날짜를 가져와서 표시하는 함수
function displayCurrentDate() {
  var currentDate = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = currentDate.toLocaleDateString('ko-KR', options);
  document.getElementById('currentDate').textContent = formattedDate;
}

// 페이지 로드 시 현재 날짜 표시
displayCurrentDate();

document.getElementById("toggleAddScheduleForm").addEventListener("click", function () {
  // Toggle the visibility of the add schedule form
  document.getElementById("addScheduleForm").classList.toggle("hide");

  // If the form is shown, focus on the input field
  if (!document.getElementById("addScheduleForm").classList.contains("hide")) {
    document.getElementById("eventName").focus();
  }
});

document.getElementById("addScheduleForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var eventName = document.getElementById("eventName").value.trim();

  if (eventName !== "") {
    var scheduleItem = document.createElement("div");
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", function () {
      if (this.checked) {
        scheduleText.classList.add("completed");
      } else {
        scheduleText.classList.remove("completed");
      }
    });
    var scheduleText = document.createElement("span");
    scheduleText.textContent = eventName;
    scheduleItem.appendChild(checkBox);
    scheduleItem.appendChild(scheduleText);
    scheduleItem.className = "schedule-item";

    // Add delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      scheduleItem.remove();
    });
    scheduleItem.appendChild(deleteButton);

    // Add schedule item to the list
    var scheduleList = document.getElementById("scheduleList");
    scheduleList.insertBefore(scheduleItem, scheduleList.firstChild);

    // Clear the input field
    document.getElementById("eventName").value = "";
  }
});
