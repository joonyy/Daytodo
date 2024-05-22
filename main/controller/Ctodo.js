const models = require('../models/index');

exports.main = (req,res)=>{
  const userId = 1;//임시 ID값
  const date = new Date();
  const year = date.getFullYear;
  const month = date.getMonth + 1;

  models.getThisMonthTodos(userId, year, month, result =>{
    console.log(result);
    res.render('index',{res : result});
  })
}

exports.thisMonth = (req,res)=>{
  const userId = parseInt(req.query.userId);
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);
  models.getThisMonthTodos(userId, year, month, result =>{
    console.log(result);
    res.send(result);
  })
}

exports.week = (req,res)=>{
  res.render('week');
}

exports.date = (req,res)=>{
  const userId = 1;//임시 ID값
  const {year, month, date} =req.query;
  console.log('exports.date 에서 출력중 : ',year, month, date);
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDate = String(date).padStart(2, '0');
  const stringDate = `${year}-${paddedMonth}-${paddedDate}`;
  console.log("stringDate는 ",stringDate);
  
  
  //models에서, 해당 날짜의 todos를 가져오기 + 콜백
  models.getThisDaysTodos(userId, stringDate, result =>{
    res.render('date',{"year":year,"month":month, "date":date, res:result});
  })
}

//todos 추가하기
exports.addTodos = (req,res)=>{
  const data = req.body;
  //날아온 데이터 형식 : 
  //{user_id : 1, "date" : stringdate, "todo_name" : string, "description" : string};

  //models페이지에서 db에 data 입력해주는 로직 구현 후 작성하기
  models.addThisDaysTodos(data, result=>{
    res.send(result);
  })
}

//todos 수정하기
exports.updateTodos = (req,res)=>{
  
}

//todos 삭제하기
exports.deleteTodos = (req,res)=>{
  //날아오는 data : todo_id 1개
  const todos_id = req.body.todos_id;
  models.deleteThisDaysTodos(todos_id, result =>{
    console.log('항목이 삭제되었습니다.');
  })
}

