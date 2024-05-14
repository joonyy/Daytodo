const TodoModel = (sequelize, DataTypes) =>{
  const Todo = sequelize.define(
    "Todos",{
      todo_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      tags_id:{
        type:DataTypes.INTEGER
      }
    }
  )
  return Todo;
}

module.exports = TodoModel;