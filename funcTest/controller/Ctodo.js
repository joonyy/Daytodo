const models = require('../models/index');

exports.main = (req,res)=>{
  models.showTodoMain(result =>{
    res.render('index',{data : result});
  })
}