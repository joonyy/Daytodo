const express = require('express');
const app = express();
const path = require('path'); // path 모듈 추가
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 정적 파일 제공 설정
app.use('/main/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 서버 실행중 . . . `);
});

