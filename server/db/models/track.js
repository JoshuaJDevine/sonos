'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    userId: DataTypes.INTEGER,
    trackName: DataTypes.TEXT,
    url: DataTypes.TEXT
  }, {});
  Track.associate = function(models) {
    Track.belongsTo(models.User, { foreignKey: "userId"})
    Track.hasMany(models.Like, { foreignKey: 'trackId'})
    Track.hasMany(models.Comment, { foreignKey: 'trackId'})
    Track.belongsToMany(models.Playlist, {through: "playlist_tracks"})
  };


  Track.uploadNewTrack = async function ({ url, trackName, userId }) {
    console.log("=======================")
    console.log("=======================")
    console.log("=======================")
    console.log("=======================")
    console.log("=======================")
    console.log("=======================")
    console.log(url, trackName, userId);

    const track = await Track.create({
      userId,
      trackName,
      url,
    });
    return "Track Created!"
  };

  return Track;
};
