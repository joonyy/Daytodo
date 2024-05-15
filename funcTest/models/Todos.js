const TodoModel = (sequelize, DataTypes) =>{
  const Todo = sequelize.define(
    "Todos",{
      todo_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      
    }
  )
  return Todo;
}

module.exports = TodoModel;