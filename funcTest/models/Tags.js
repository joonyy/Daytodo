const TagsModel = (sequelize, DataTypes) =>{
  const Tags = sequelize.define(
    "Tags",{
      tag_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      todo_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      tag_name:{ 
        type : DataTypes.String(255),
        allowNull:false,
      }
    }
  )
  return Tags;
}

module.exports = TagsModel;