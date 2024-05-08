const EventModel = (sequelize, DataTypes) =>{
  const Event =  sequelize.define(
    "Events",{
      event_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      event_title:{
        type:DataTypes.STRING(60),
      },
      description:{
        type:DataTypes.TEXT,
      },
      start_date:{
        type:DataTypes.DATE,
      },
      end_date:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      is_clear : {
        type: DataTypes.BOOLEAN,
        allowNull : false,
      },
      auto_clear : {
        type: DataTypes.BOOLEAN,
        allowNull : false,
      },
      tags : {
        type: DataTypes.STRING(60),
      }
    }
  )
  return Event;
}

module.exports = EventModel;