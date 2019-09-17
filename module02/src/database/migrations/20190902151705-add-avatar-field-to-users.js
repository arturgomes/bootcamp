module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

<<<<<<< HEAD
  down: queryInterface => {
=======
  down: (queryInterface, Sequelize) => {
>>>>>>> 958d31208298e10818f1203fe91978bc72fe0166
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
