// 체크박스 클릭 시 투두 아이템의 배경색 변경
const todoItems = document.querySelectorAll('.todo-item input[type="checkbox"]');
todoItems.forEach(item => {
  item.addEventListener('change', () => {
    const todoItem = item.parentElement;
    const todoTitle = todoItem.querySelector('.todo-title');
    if (item.checked) {
      todoItem.classList.add('checked');
      todoTitle.classList.add('checked');
    } else {
      todoItem.classList.remove('checked');
      todoTitle.classList.remove('checked');
    }
  });
});