const express =require('express');
const app = express();
const PORT = 8000;
const { sequelize } = require('./models');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/static',express.static(__dirname + '/static'))
todoRouter = require('./routes/todo');
app.use('/', todoRouter);

const userRouter = require('./routes/user')
app.use('/user',userRouter);

sequelize
  .sync({force:false})
  .then(()=>{
    app.listen(PORT,()=>{
      console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
    })
  })
  .catch((err)=>{
    console.error(err);
  })