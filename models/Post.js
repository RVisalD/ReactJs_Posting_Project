module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    description: {
      type: Datatypes.TEXT('long'),
      allowNull: false,
    },
  });
  Post.associate = (models) =>{
    Post.hasMany(models.Review,{
      onDelete: "cascade"
    })
    Post.hasMany(models.Like,{
      onDelete: "cascade"
    })
  }
  return Post;
};
