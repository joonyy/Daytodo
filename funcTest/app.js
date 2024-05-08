const express = require('express');
const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/static',express.static(__dirname + '/static'))

const indexRouter = require('./routes/index');
app.use('/',indexRouter);

app.listen(8080,()=>{
  console.log('8080번 포트에서 서버 실행중 . . .');
})