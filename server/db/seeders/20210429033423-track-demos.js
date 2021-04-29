'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


      return queryInterface.bulkInsert('Tracks', [
          {userId: 1,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619460132465.mp3",
            trackName: "Deinde",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 2,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619460173543.mp3",
            trackName: "Hearth",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 3,
            url: "https://sonos-app.s3.amazonaws.com/1619576725478.mp3",
            trackName: "Intermissum",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 4,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576818958.mp3",
            trackName: "Cinematic Theme",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 5,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576854575.mp3",
            trackName: "Finlandia",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 1,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576882087.mp3",
            trackName: "Flight of the Bumble Bee",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 2,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576893755.mp3",
            trackName: "Pomp and Circumstance",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 3,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576909238.mp3",
            trackName: "Acri",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {userId: 3,
            url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576939375.mp3",
            trackName: "Helling",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        {userId: 3,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576967609.mp3",
          trackName: "Caprichocatalan",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 3,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576983497.mp3",
          trackName: "Malaguena",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 3,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619576998018.mp3",
          trackName: "Serenata",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 3,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577013905.mp3",
          trackName: "Tango",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 3,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577034827.mp3",
          trackName: "Zortzico",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 4,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577050109.mp3",
          trackName: "Brandenburg Concerto No.3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 5,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577066093.mp3",
          trackName: "Commentatio",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 4,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577086796.mp3",
          trackName: "Arabesque",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 4,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577099484.mp3",
          trackName: "Images",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {userId: 4,
          url: "https://sonos-app.s3.us-west-1.amazonaws.com/1619577113137.mp3",
          trackName: "Seasons",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Tracks', null, {});

  }
};
