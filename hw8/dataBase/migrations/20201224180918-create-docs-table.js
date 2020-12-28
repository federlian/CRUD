const {
    CASCADE,
    ID,
    TABLE_NAME_CARS,
    TABLE_NAME_DOCUMENTS
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TABLE_NAME_DOCUMENTS, {
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
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: TABLE_NAME_CARS,
                    key: ID
                }
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(TABLE_NAME_DOCUMENTS);
    }
};
