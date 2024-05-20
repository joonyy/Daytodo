function getSelectedDate() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('date');
  }

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

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", function () {
        scheduleItem.remove();
      });
      scheduleItem.appendChild(deleteButton);

      const editButton = document.createElement("button"); // Add Edit Button
      editButton.textContent = "수정"; // Edit Button Text
      editButton.className = "edit-button"; // Edit Button Class
      editButton.addEventListener("click", function () { // Edit Button Click Event
        const newText = prompt("일정을 수정하세요", scheduleText.textContent); // Prompt for new text
        if (newText !== null) {
          scheduleText.textContent = newText; // Update schedule text
        }
      });
      scheduleItem.appendChild(editButton); // Append Edit Button

      const scheduleList = document.getElementById("scheduleList");
      scheduleList.insertBefore(scheduleItem, scheduleList.firstChild);

      document.getElementById("eventName").value = "";
    }
  });