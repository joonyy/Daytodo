const express = require('express');
const path = require('path');

const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// EJS 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 라우트
app.get('/', (req, res) => {
    // index.ejs 렌더링
    res.render('index');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
