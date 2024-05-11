const {Event, Task} = require('../models');

exports.month = (req,res) =>{
  res.render('monthlyView'/* , {data : result} */);
  //database에서 현재 달에 있는 일정을 각각 칸에 맞추어 제목을 달아줘야 함.
  //select * where end_date is in (이번달)
  //res.send()
}

exports.week = (req,res)=>{
  res.render('weeklyView'/*, {data : result} */);
  //database에서 현재 주에 있는 일정을 각각 칸에 맞추어 제목을 뿌릴 것.
  //select * where end_date is in (이번주)
}

exports.date = (req,res)=>{
  res.render('dailyView'/*, {data : result} */);
  //database에서 현재 주에 있는 일정을 각각 칸에 맞추어 제목을 뿌릴 것.
  //select * where end_date is in (오늘 날짜)
}

exports.showTodo = (req,res) =>{
  //데이터베이스에서 찾는다. date가 포함되는 Task, Event를.
  console.log('돌려줬어~')
}

exports