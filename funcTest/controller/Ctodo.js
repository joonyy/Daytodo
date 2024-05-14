const models = require('../models/Model')

exports.main = (req,res)=>{
  let now = new Date();
  let thisYear = now.getFullYear();
  let thisMonth = now.getMonth();
  let firstDay = new Date(thisYear, thisMonth, 1); // 이번 달의 첫째 날을 구합니다.
  let lastDay = new Date(thisYear, thisMonth + 1, 0).getDate();// 이번 달의 마지막 날을 구합니다.
  let dayOfWeek = firstDay.getDay(); // 첫째 날의 요일을 구합니다. (0: 일요일, 1: 월요일, ..., 6: 토요일)
  let today = {
    year : thisYear,
    month : thisMonth,
    
  }
  res.render('index',{});
}