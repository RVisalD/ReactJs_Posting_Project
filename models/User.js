module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    username: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) =>{
    User.hasMany(models.Like,{
      onDelete: "cascade"
    }),
    User.hasMany(models.Post,{
      onDelete: "cascade"
    })
  }
  return User;
};
