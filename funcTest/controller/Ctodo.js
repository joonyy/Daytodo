const models = require('../models/index');

exports.main = (req,res)=>{
  const date = new Date();
  const userId = 1;//임시 ID값
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
  const {year, month, date} =req.query;
  console.log('exports.date 에서 출력중 : ',year,month,date);
  res.render('date',{"year":year,"month":month, "date":date});
}