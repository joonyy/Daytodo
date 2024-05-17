const db = require('./db.json');
const users = db.users;
const tags = db.tags;
const todos = db.todos;

exports.showTodoMain = (cb) =>{
  const userOne = users
  .filter(user => user.user_id === 1)
  console.log(userOne);
}