//엄격한 문법 사용 모드
'use strict'; 
const Sequelize = require('sequelize');
const config = require(__dirname+"/../config/config.json")["development"];
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

//만들어진 모델이 들어갈 자리.
const UserModel = require('./Users')(sequelize, Sequelize);
const TodoModel = require('./Todos')(sequelize,Sequelize);
const TagsModel = require('./Tags')(sequelize, Sequelize);

//모델간 관계 설정하기



//db 항목에 추가하기
db.Todo = TodoModel;
db.Tags = TagsModel;
db.User = UserModel;

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;