'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.TEXT,
    isPrivate: DataTypes.BOOLEAN
  }, {});
  Playlist.associate = function(models) {
    // Playlist.belongsToMany(models.user, {through: "playlist_users", foreignKey: 'playlist_id', otherKey: 'user_id'})
    // Playlist.belongsToMany(models.track, {through: "playlist_tracks"})
  };
  return Playlist;
};
