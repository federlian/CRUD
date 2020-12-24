const bcrypt = require('bcrypt');

const { ErrorInstance, errors: { WRONG_EMAIL_OR_PASSWORD } } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordEquals = await bcrypt.compare(password, hash);

        if (!isPasswordEquals) {
            throw new ErrorInstance(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
        }
    }
};
