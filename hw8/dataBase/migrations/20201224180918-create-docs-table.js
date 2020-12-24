module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('documents', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            path: {
                type: Sequelize.STRING,
                allowNull: false
            },

            car_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'cars',
                    key: 'id'
                }
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('documents');
    }
};
