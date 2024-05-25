const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, 'Users.json');
const tagsPath = path.join(__dirname, 'Tags.json');
const todosPath = path.join(__dirname, 'Todos.json');

const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const tags = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'));

//stringDate에서 date를 추출하는 함수
const stringDateToIntDate = (stringDate) =>{
  return parseInt(stringDate.split('-')[2],10)
}

//stringDate에서 month를 추출하는 함수
const stringDateToIntMonth = (stringDate) =>{
  return parseInt(stringDate.split('-')[1],10)
}

//stringDate에서 year을 추출하는 함수
const stringDateToIntYear = (stringDate) =>{
  return parseInt(stringDate.split('-')[0],10)
}

// 데이터베이스(.json파일)에 저장하는 함수
const saveToFile = async (data, filePath) =>{
  try{
    await fs.writeFile(filePath, JSON.stringify(data,null,2));
  }catch(err){
    console.error('파일을 쓰다가 오류가 생겼습니다 : ', err);
    throw err;
  }
};

//userId 에 해당하는 todos 테이블을 가져오는 함수
const getTodosByUserId = (userId) =>{
  return todos.filter(todo => todo.user_id === userId);
}
//월별 Todos : 날짜 중 year과 month와 일치하는 Todos 데이터(튜플) 전송
const getTodosByMonth = (todos, stringDate) =>{
  stringDate = String(stringDate);
  const year = stringDateToIntYear(stringDate);
  const month = stringDateToIntMonth(stringDate);
  return todos
  .filter(todo =>{
    const todoYear = stringDateToIntYear(todo.date);
    const todoMonth = stringDateToIntMonth(todo.date);
    return todoYear===year && todoMonth===month;
  })
  .map(todo => {
    const day = stringDateToIntDate(todo.date);
    return{
      todo_name:todo.todo_name,
      day:day
    };
  });
}

const getTodosByDate = (todos, stringDate) =>{
  stringDate = String(stringDate);
  return todos
  .filter(todos =>{
    return todos.date === stringDate;
  });
}

//userId에 해당하는 todo를 가져와, getTodosByMonth 실행 후, callback의 argument로 결과값 callback.
//해당 월에 있는 모든 todos 가져오기
exports.getThisMonthTodos = (userId, stringDate, cb) =>{
  userId = parseInt(userId);
  const userTodos = getTodosByUserId(userId);
  const userTodosInMonth = getTodosByMonth(userTodos, stringDate);
  cb(userTodosInMonth);
}

//userId와 해당 날짜의 todos를 가져온다.
//제목, 내용, 완료여부 세가지 항목만 가져온다.
exports.getThisDaysTodos = (userId, stringDate, cb)=>{
  userId = parseInt(userId);
  const userTodos = getTodosByUserId(userId);
  const result = getTodosByDate(userTodos, stringDate);
  console.log('models/index.js에서 보내는 result : ',result);
  cb(result);
}

//todos 추가하기
exports.addThisDaysTodos = async (data, cb)=>{
  const userId = data.user_id || 1;
  const stringDate = data.date;
  const todoName = data.todo_name;
  const description = data.description;

  const newTodo = {
    todos_id : todos.length + 1,
    user_id : userId,
    todo_name : todoName,
    description : description,
    date: stringDate,
    state:false
  }
  todos.push(newTodo);
  await saveToFile(todos, todosPath);
}

//todos 객체 수정하기
exports.updateThisDaysTodos = async (data, cb)=>{
  todos.push(data);
  await saveToFile(todos, todosPath);
}

//todos 항목 삭제하기
exports.deleteThisDaysTodos = async (index, cb) =>{
  todos = todos.filter(todo => todo.todos_id !== index)
  saveToFile(todos, todosPath);
}