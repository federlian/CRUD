const { Router } = require('express');

const { confirmController } = require('../../controllers');

const confirmRouter = Router();

confirmRouter.post('/:token',
    confirmController.confirmEmail);

module.exports = confirmRouter;
