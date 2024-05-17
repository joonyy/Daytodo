const models = require('../models/index');

exports.main = (req,res)=>{
  const date = new Date();
  const userId = 1;//임시 ID값
  const month = date.getMonth + 1;
  models.getThisMonthTodos(userId, month, result =>{
    console.log(result);
    res.render('index',{todoData : result});
  })
}

exports.thisMonth = (req,res)=>{
  console.log('axios요청을 받았어요');
  const userId = parseInt(req.query.userId);
  const month = parseInt(req.query.month);
  console.log(userId, month);
  models.getThisMonthTodos(userId, month, result =>{
    console.log(result);
    res.send(result);
  })
}