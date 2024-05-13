// JavaScript 코드
// 이곳에 JavaScript 코드를 작성하세요
// 요일 선택 시 해당 요일의 내용을 보여주는 함수
function showDay(day) {
    // 모든 요일을 숨김
    var days = document.querySelectorAll('.day');
    days.forEach(function(dayElement) {
        dayElement.classList.remove('active');
    });
    
    // 선택한 요일을 표시
    var selectedDay = document.getElementById(day);
    selectedDay.classList.add('active');
}

// 예시: 월요일 선택 시
showDay('monday');
