const {
    CASCADE,
    ID,
    TABLE_NAME_CARS,
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

            avatar: {
                type: Sequelize.STRING
            }
        });

        await queryInterface.createTable(TABLE_NAME_CARS, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            model: {
                type: Sequelize.STRING,
                allowNull: false
            },

            customer: {
                type: Sequelize.STRING,
                allowNull: false
            },

            year: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: TABLE_NAME_USERS,
                    key: ID
                }
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(TABLE_NAME_CARS);
        await queryInterface.dropTable(TABLE_NAME_USERS);
    }
};
