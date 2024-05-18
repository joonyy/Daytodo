const express =require('express');
const app = express();
const PORT = 8000;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/static',express.static(__dirname + '/static'))
const todoRouter = require('./routes/todo');
app.use('/', todoRouter);

const userRouter = require('./routes/user');
app.use('/user',userRouter);

const othersRouter = require('./routes/others');
app.use('/others', othersRouter);

const searchRouter = require('./routes/search');
app.use('/search',searchRouter);

app.listen(PORT,()=>{
  console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
})