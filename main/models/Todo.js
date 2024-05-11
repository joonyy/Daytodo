const TodoModel = (sequelize, DataTypes) =>{
  const Todo = sequelize.define(
    "Todos",{
      task_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      event_id:{
        type:DataTypes.INTEGER
      },
      task_id:{
        type:DataTypes.INTEGER
      }
    }
  )
  return Todo;
}

module.exports = TodoModel;