'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    userId: DataTypes.INTEGER,
    url: DataTypes.TEXT
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: "userId"})
    // Track.hasMany(models.track, { foreignKey: 'trackId'})
    // Track.hasMany(models.comment, { foreignKey: 'trackId'})
    // Track.belongsToMany(models.playlist, {through: "playlist_tracks"})
  };
  return Track;
};
