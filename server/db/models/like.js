'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // Like.belongsTo(models.user, { foreignKey: 'userId'})
    // Like.belongsTo(models.track, { foreignKey: 'trackId'})
  };
  return Like;
};
