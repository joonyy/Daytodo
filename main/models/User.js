const UserModel = (sequelize, DataTypes) =>{
  const User = sequelize.define(
    "Users",{
      user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull : false,
        autoIncrement : true,
      },
      email:{
        type:DataTypes.STRING(255),
      },
      username:{
        type:DataTypes.STRING(255),
      },
      password:{
        type:DataTypes.STRING(255),
      },
      isLoggedIn:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
      }
    }
  )
  return User;
}
module.exports = UserModel;