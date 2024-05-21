const usersData = require('./Users.json');
const users = usersData.users;

const tagsData = require('./Tags.json');
const tags = tagsData.tags;

const todosData = require('./Todos.json');
const todos = todosData.todos;

const fs = require('fs'); //data 저장하기 위함.

//userId 에 해당하는 todos 테이블을 가져오는 함수
const getTodosByUserId = (userId) =>{
  return todos.filter(todo => todo.user_id === userId)
};

//월별 Todos : 날짜 중 year과 month와 일치하는 Todos 데이터(튜플) 전송
const getTodosByMonth = (todos, year, month) =>{
  return todos
  .filter(todo =>parseInt(todo.date.split('-')[1],10) === month&&parseInt(todo.date.split('-')[0],10)=== year )
  .map(todo => {
    const day = parseInt(todo.date.split('-')[2],10);
    return{
      todo_name:todo.todo_name,
      day:day
    };
  });
}

//userId에 해당하는 todo를 가져와, getTodosByMonth 실행 후, callback의 argument로 결과값 callback.
//해당 월에 있는 모든 todos 가져오기
exports.getThisMonthTodos = (userId, year, Month, cb) =>{
  const userTodos = getTodosByUserId(userId);
  const userTodosInMonth = getTodosByMonth(userTodos, year, Month);
  cb(userTodosInMonth);
}

//userId와 해당 날짜의 todos를 가져온다.
//제목, 내용, 완료여부 세가지 항목만 가져온다.
exports.getThisDaysTodos = (userId, stringDate, cb)=>{
  const userTodos = getTodosByUserId(userId);
  const result = userTodos
  .filter(todo => todo.date === stringDate)
  .map(todo =>{
    return{
      todo_name:todo.todo_name,
      todo_details : todo.description,
      state: todo.state,
    };
  })
  console.log(result);
  cb(result);
}

//json 파일 입력.
//새로운

exports.addThisDaysTodos = (userId, stringDate, cb)=>{
  //새로운 todos 생성
}