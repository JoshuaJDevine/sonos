'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId'})
    Comment.belongsTo(models.Track, { foreignKey: 'trackId'})
  };

  Comment.uploadNewComment = async function ( content, userId, trackId ) {
    console.log("==========CREATING COMMENT FROM MODEL");
    console.log( content, userId, trackId);

    const comment = await Comment.create({
      content,
      userId,
      trackId,
    });
    return comment;
  };

  return Comment;
};


