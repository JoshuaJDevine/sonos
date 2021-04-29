'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'LudwigB@ArchdukeRudplh.estate',
        username: 'LudwigB',
        hashedPassword: bcrypt.hashSync('DONALDFRANCISTOVEY'),
        profileImageUrl: "https://sonos-app.s3.us-west-1.amazonaws.com/1619731996559.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: 'dShostakovich',
        hashedPassword: bcrypt.hashSync("Rusky"),
        profileImageUrl: "https://sonos-app.s3.us-west-1.amazonaws.com/1619731788001.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: 'Ialbeniz',
        hashedPassword: bcrypt.hashSync("Topemoff"),
        profileImageUrl: "https://sonos-app.s3.us-west-1.amazonaws.com/1619731846029.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: 'Cdebussy',
        hashedPassword: bcrypt.hashSync("ViveFrance"),
        profileImageUrl: "https://sonos-app.s3.us-west-1.amazonaws.com/1619731908519.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: 'AmadeusM',
        hashedPassword: bcrypt.hashSync("FluteForLife"),
        profileImageUrl: "https://sonos-app.s3.us-west-1.amazonaws.com/1619731961607.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      id: { [Sequelize.Op.gt]: 0 }
    });
  }
};
