const fs = require('fs');
const path = require('path');
const { users } = require('../dataBase');

const pathDataBase = path.join(process.cwd(), 'dataBase', 'user-list.json');

module.exports = {
    insertUser: (user) => {
        users.push(user);
        fs.writeFile(pathDataBase, JSON.stringify(users), ((err) => {
            if (err) throw err;
        }));

        return users;
    },

    getAllUsers: () => users,

    findUserByEmail: (email) => users.find((user) => user.email === email),

    removeUser: (email) => users.filter((user) => user.email !== email)

};
