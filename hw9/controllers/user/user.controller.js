const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { transactionInstance } = require('../../dataBase').getInstance();
const { PUBLIC_PATH, PUBLIC_USERS_PATH, PUBLIC_USERS_PHOTOS_PATH } = require('../../constants/constants');
const {
    errors: {
        OK_REQUEST,
        USER_CREATED,
        USER_DELETED,
        USER_UPDATED
    }
} = require('../../error');
const { passwordHelper: { hash } } = require('../../helpers');
const { userServices, emailService, logService } = require('../../services');
const { WELCOME, ACCOUNT_DELETED } = require('../../constants/email-actions.enum');

module.exports = {
    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { avatar, body: { email, name, password } } = req;
            const passwordHashed = await hash(password);

            Object.assign(req.body, { password: passwordHashed });

            const createUser = await userServices.insertUser(req.body, transaction);

            if (avatar) {
                const pathWithoutPublic = path.join(PUBLIC_USERS_PATH, `${createUser.id}`, PUBLIC_USERS_PHOTOS_PATH);
                const photoDir = path.join(process.cwd(), PUBLIC_PATH, pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                await userServices.updateUser(createUser.id, { avatar: finalPhotoPath }, transaction);
            }

            await emailService.sendMail(email, WELCOME, { username: name });

            await logService.create({ message: `${name} ${USER_CREATED.message}` });

            await transaction.commit();
            res.status(USER_CREATED.code).json(USER_CREATED.message);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            await res.json(req.user);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { userId } = req.params;
            const { name } = req.body;

            await userServices.updateUser(userId, req.body, transaction);

            await logService.create({ message: `${name} ${USER_UPDATED.message}` });
            await transaction.commit();
            res.status(USER_UPDATED.code).json(USER_UPDATED.message);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { email, name } = req.body;
            const { userId } = req.params;

            await userServices.removeUser(userId, transaction);
            await emailService.sendMail(email, ACCOUNT_DELETED, { username: name });

            await logService.create({ message: `${name} ${USER_DELETED.message}` });
            await transaction.commit();
            res.status(USER_DELETED.code).json(USER_DELETED.message);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
