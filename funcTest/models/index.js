const db = require('./db.json');
const users = db.users;
const tags = db.tags;
const todos = db.todos;

//userId 에 해당하는 todos 테이블을 가져오는 함수
const getTodosByUserId = (userId) =>{
  return todos.filter(todo => todo.user_id === userId)
};

//월별 Todos
const getTodosByMonth = (todos, month) =>{
  return todos
  .filter(todo =>parseInt(todo.date.split('-')[1],10) === month)
  .map(todo => {
    const day = parseInt(todo.date.split('-')[2],10);
    return{
      todo_name:todo.todo_name,
      day:day
    };
  });
}

exports.getThisMonthTodos = (userId, Month, cb) =>{
  const userTodos = getTodosByUserId(userId);
  const userTodosInMonth = getTodosByMonth(userTodos, Month);
  console.log("userTodosInMonth : ",userTodosInMonth);
  cb(userTodosInMonth);
}