'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Lists', [
      { name: 'List 1', createdAt: new Date(), updatedAt: new Date(), id: 1},
      { name: 'List 2', createdAt: new Date(), updatedAt: new Date(), id: 2 },
      { name: 'List 3', createdAt: new Date(), updatedAt: new Date(), id: 3 },
   ], {});

    await queryInterface.bulkInsert('Tasks', [
      { name: 'Task 1', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 1 },
      { name: 'Task 2', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 1 },
      { name: 'Task 3', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 1 },
      { name: 'Task 4', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 2 },
      { name: 'Task 5', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 2 },
      { name: 'Task 6', isComplete: false, createdAt: new Date(), updatedAt: new Date(), listId: 2 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
