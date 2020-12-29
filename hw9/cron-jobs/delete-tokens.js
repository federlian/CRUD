const { loginService } = require('../services');

module.exports = async () => {
    await loginService.deleteByParams({ });
};
