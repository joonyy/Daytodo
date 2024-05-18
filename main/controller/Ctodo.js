const models = require('../models/index');

//month별로 보여준다!
exports.month = (req,res)=>{
  const date = new Date();
  const userId = 1;//임시 ID값
  const year = date.getFullYear;
  const month = date.getMonth + 1;
  models.getThisMonthTodos(userId, year, month, result =>{
    console.log(result);
    res.render('index',{res : result});
  })
}

//해당 연,월에 있는 모든 todo 가져오기
exports.thisMonth = (req,res)=>{
  const userId = parseInt(req.query.userId);
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month);
  models.getThisMonthTodos(userId, year, month, result =>{
    console.log(result);
    res.send(result);
  })
}

//week 별로 보여준다!
exports.week = (req,res)=>{
  res.render('weeklyView'/*, {data : result} */);
  //database에서 현재 주에 있는 일정을 각각 칸에 맞추어 제목을 뿌릴 것.
  //select * where end_date is in (이번주)
}

//일별로 보여준다!
exports.date = (req,res)=>{
  res.render('dailyView'/*, {data : result} */);
  //database에서 현재 주에 있는 일정을 각각 칸에 맞추어 제목을 뿌릴 것.
  //select * where end_date is in (오늘 날짜)
}

//새로 만들 수 있도록 한다!
exports.createTodo = (req,res) =>{
  const data = req.body;
  console.log(data);
  console.log('새로 만들었어~');
  data.home = "집에간절히 가고싶습니다.";
  console.log(data);
  res.send(data);
}

exports.showTodo = (req,res) =>{
  //투두 항목 자세히 보기.
  const data = req.query;
  console.log("프론트에서 넘어온 : ",data);
  data.date = "오늘.";
  console.log('돌려줬어~');
  res.send(data);
}

exports.editTodo = (req,res) =>{
  //todo id를 통해 task인지 event인지 분별하여, 수정할 데이터를 보여줘야 해요. form에 작성해둔 페이지를 
  const data = req.query;
  console.log(data);
  data.name = "주모니";
  console.log('이걸 고칠거구나~ 보여줄게~');
  console.log(data);
  res.send(data);
}

exports.updateTodo = (req,res) =>{
  //editTodo 이후 Todo를 업데이트해줍니다.
  console.log('updateTodo');
}

exports.deleteTodo = (req,res) =>{
  //editTodo 이후 Todo를 삭제해줍니다.
  console.log('deleteTodo');
}