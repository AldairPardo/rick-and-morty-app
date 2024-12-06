'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Characters', [
      {
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: 'Earth (C-137)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Characters', null, {});
  },
};
