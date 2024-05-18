const db = require('./db.json');
const users = db.users;
const tags = db.tags;
const todos = db.todos;

const userOne = users
.filter(user => user.user_id === 1)
.map(user => user.user_id);

const todosOfUserOne = todos
.filter(todos => todos.user_id === userOne)
.map(todos => todos.todo_name);
console.log(userOne);
console.log(todosOfUserOne);
todos