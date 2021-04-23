'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // Comment.belongsTo(models.user, { foreignKey: 'userId'})
    // Comment.belongsTo(models.track, { foreignKey: 'trackId'})
  };
  return Comment;
};
