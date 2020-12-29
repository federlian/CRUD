const {
    CASCADE,
    ID,
    TABLE_NAME_O_AUTH,
    TABLE_NAME_USERS
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TABLE_NAME_O_AUTH, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            access_token: {
                type: Sequelize.STRING,
                allowNull: false
            },

            refresh_token: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: TABLE_NAME_USERS,
                    key: ID
                }
            },

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(TABLE_NAME_O_AUTH);
    }
};
