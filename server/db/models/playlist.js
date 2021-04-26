'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.TEXT,
    isPrivate: DataTypes.BOOLEAN
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsToMany(models.User, {through: "playlist_users"})
    Playlist.belongsToMany(models.Track, {through: "playlist_tracks"})
  };
  return Playlist;
};
