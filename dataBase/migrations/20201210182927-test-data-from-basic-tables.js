const { TABLE_NAME_USERS } = require('../../constants/constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(TABLE_NAME_USERS, [
            {
                id: 1,
                name: 'Anna',
                email: 'anya@mail.com',
                password: 'lkjcsdlkmla'
            },
            {
                id: 2,
                name: 'Misha',
                email: 'muxac@mail.com',
                password: 'lmlkmoijcn'
            },
            {
                id: 3,
                name: 'Andriy',
                email: 'andriyko@mail.com',
                password: 'nmklonuibuy'
            }
        ]);
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(TABLE_NAME_USERS, null, {});
    }
};
