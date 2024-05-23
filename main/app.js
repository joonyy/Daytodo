const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.get('/date', (req, res) => {
    res.render('date');
  });  // Createtodo 경로 종료

  app.get('/viewtodo', (req, res) => {
    res.render('viewtodo');
  }); //viewtodo 경로 종료

app.get('/week')

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
});