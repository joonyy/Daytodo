const db = require('./db.json');
const users = db.users;
const tags = db.tags;
const todos = db.todos;

//userId 에 해당하는 todos 테이블을 가져오는 함수
const getTodosByUserId = (userId) =>{
  console.log(typeof(todos));
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
exports.getThisMonthTodos = (userId, year, Month, cb) =>{
  const userTodos = getTodosByUserId(userId);
  const userTodosInMonth = getTodosByMonth(userTodos, year, Month);
  cb(userTodosInMonth);
}
