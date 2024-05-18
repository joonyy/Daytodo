const models = require('../models/index');

exports.main = (req,res)=>{
  const userId = 1;//임시 ID값
  const date = new Date();
  const year = date.getFullYear;
  const month = date.getMonth + 1;

  models.getThisMonthTodos(userId, year, month, result =>{
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
  console.log('exports.date 에서 출력중 : ',year,month,date);
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDate = String(date).padStart(2, '0');
  const stringDate = `${year}-${paddedMonth}-${paddedDate}`;
  console.log("stringDate는 ",stringDate);

  //models에서, 해당 날짜의 todos를 가져오기 + 콜백
  models.getThisDaysTodos(userId, stringDate, result =>{
    res.render('date',{"year":year,"month":month, "date":date, res:result});
  })
}

exports.createTodo = (req,res)=>{
  const date = new Date().getDate();
  const year = date.getFullYear;
  const month = date.getMonth + 1;
  res.render('date',{"year":year, "month":month, "date":date});
}
