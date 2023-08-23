module.exports = (sequelize, Datatypes) => {
    const Review = sequelize.define("Review", {
      review: {
        type: Datatypes.TEXT('long'),
        allowNull: false,
      },
      username: {
        type: Datatypes.STRING,
        allowNull: false
      }
    });
    return Review;
  };
  