const models = require('../models/index');

const dateToStringDate = (date) =>{
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

exports.main = (req,res)=>{
  const userId = 1;//임시 ID값
  const date = new Date();
  const stringDate = dateToStringDate(date);
  
  models.getThisMonthTodos(userId, stringDate, result =>{
    console.log("main에서 실행된 : " , result); //해당월 todos console에 띄우기
    res.render('index',{res : result});
  })
}

exports.thisMonth = (req,res)=>{
  const {userId, date} = req.query;
  models.getThisMonthTodos(userId, date, result =>{
    res.send(result);
  })
}

exports.week = (req,res)=>{
  res.render('week');
}

exports.viewTodo = (req,res)=>{
  res.render('viewtodo');
}

exports.date = (req,res)=>{
  const {userId,date} =req.query;
  console.log(req.query);
  console.log('exports.date 에서 출력중 : ', date);

  //models에서, 해당 날짜의 todos를 가져오기 + 콜백
  models.getThisDaysTodos(userId, date, result =>{
    res.render('date',{"stringDate":date, "res":result});
  })
}

//todos 추가하기
exports.addTodos = (req, res) => {
  const data = req.body;
  models.addThisDaysTodos(data)
    .then(result => {
      res.send({ todo_id: result.todos_id });
    })
    .catch(error => {
      console.error("Error adding todo:", error);
      res.status(500).send("Error adding todo");
    });
};

//todos 수정하기
exports.updateTodos = (req,res)=>{
  const data = req.body;
  models.updateThisTodos(data,result =>{
    res.send({success:true})
  })
}
exports.toggleTodos = (req,res) =>{
  const data = req.body;
  models.toggleTodo(data, result =>{
    res.send({success:true});
  })
}
//todos 삭제하기
exports.deleteTodos = (req,res)=>{
  //날아오는 data : todo_id 1개
  const todoId = req.body.todo_id;
  models.deleteThisDaysTodos(todoId);
}