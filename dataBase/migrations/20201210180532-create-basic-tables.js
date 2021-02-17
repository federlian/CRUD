const {
    TABLE_NAME_USERS
} = require('../../constants/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(TABLE_NAME_USERS, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false
            },

            confirmed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },

            avatar: {
                type: Sequelize.STRING
            },

            confirm_token: {
                type: Sequelize.STRING
            },

            deleted_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(TABLE_NAME_USERS);
    }
};
