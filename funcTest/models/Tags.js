const TagsModel = (sequelize, DataTypes) =>{
  const Tags = sequelize.define(
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
  return Tags;
}

module.exports = TagsModel;