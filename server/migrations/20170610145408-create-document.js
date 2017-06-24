module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
      },
      author: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      access: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        defaultValue: 2,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId'
        }
      },
    })
  ),
  down: queryInterface => (
    queryInterface.dropTable('Documents')
  )
};
