module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
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
        await queryInterface.bulkInsert('cars', [
            {
                id: 1,
                model: 'Lanos',
                customer: 'Daewoo',
                year: 2008,
                user_id: 1,
            },
            {
                id: 2,
                model: 'X5',
                customer: 'BMW',
                year: 2012,
                user_id: 2,
            },
            {
                id: 3,
                model: 'Traffic',
                customer: 'Renault',
                year: 2010,
                user_id: 3,
            }
        ]);
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.bulkDelete('cars', null, {});
    }
};
