const models = require('../models')
let ChosenDate = new Date(); // 서버 상 오늘 날짜
let thisYear = ChosenDate.getFullYear(); // 올해
let thisMonth = ChosenDate.getMonth();//이번달(0 : 1월, 1:2월 , ...)
let firstDate = new Date(thisYear, thisMonth, 1); //이번달 첫날. 일 정보
let lastDate = new Date(thisYear, thisMonth + 1 , 0); //이번달 마지막 날 일 정보
let daysInMonth = lastDate.getDate() //이번달 마지막 날. 일 정보 
let firstDayOfMonth = firstDate.getDay(); //첫째 날의 요일 출력. (0 : 일요일, 1 : 월요일)
let lastDayOfMonth =  lastDate.getDay(); //마지막 날의 요일
let firstWeek = Math.ceil((1 + (6 - firstDayOfMonth)) / 7); // 첫째 날이 속한 주
let lastWeek = Math.ceil((daysInMonth - (7 - lastDayOfMonth)) / 7); // 마지막 날이 속한 주
let weekCount = lastWeek - firstWeek + 1;

exports.main = (req,res)=>{
  res.render('index',{
    year : thisYear, //선택된 날짜의 연도
    month : thisMonth, //선택된 날짜의 월
    daysInMonth : daysInMonth, //선택된 월의 날짜 수
    firstDayOfMonth: firstDayOfMonth, // 이번달 첫날 요일
    weekCount : weekCount //이번달 주 수 
    
  });
}