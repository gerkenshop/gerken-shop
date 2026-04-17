const { Migration } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Creating collections table with product relationships
    await queryInterface.createTable('collections', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Inserting default collections
    const defaultCollections = [
      { name: 'Warhammer Figurines' },
      { name: 'Decorations' },
      { name: 'Custom Inventions' },
      { name: 'Seasonal Products' },
    ];

    await queryInterface.bulkInsert('collections', defaultCollections);
  },

  down: async (queryInterface, Sequelize) => {
    // Dropping the collections table if it exists
    await queryInterface.dropTable('collections');
  },
};