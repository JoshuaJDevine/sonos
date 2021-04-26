'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    userId: DataTypes.INTEGER,
    url: DataTypes.TEXT
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: "userId"})
    Track.hasMany(models.Like, { foreignKey: 'trackId'})
    Track.hasMany(models.Comment, { foreignKey: 'trackId'})
    Track.belongsToMany(models.Playlist, {through: "playlist_tracks"})
  };
  return Track;
};
