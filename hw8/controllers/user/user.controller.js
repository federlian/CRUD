const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { userServices, emailService } = require('../../services');
const { errors: { USER_CREATED, OK_REQUEST, USER_DELETED } } = require('../../error');
const { passwordHelper: { hash } } = require('../../helpers');
const { WELCOME, ACCOUNT_DELETED } = require('../../constants/email-actions.enum');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, body: { email, name, password } } = req;
            const passwordHashed = await hash(password);

            Object.assign(req.body, { password: passwordHashed });

            const createUser = await userServices.insertUser(req.body);

            if (avatar) {
                const pathWithoutPublic = path.join('user', `${createUser.id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'public', pathWithoutPublic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));

                await userServices.updateUser(createUser.id, { avatar: finalPhotoPath })
            }

            await emailService.sendMail(email, WELCOME, { username: name });
            res.status(USER_CREATED.code).json(USER_CREATED.message);
        } catch (e) {
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
        try {
            const { userId } = req.params;

            await userServices.updateUser(userId, req.body);

            res.status(OK_REQUEST.code).json(OK_REQUEST.message);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { email, name } = req.body;
            const { userId } = req.params;

            await userServices.removeUser(userId);
            await emailService.sendMail(email, ACCOUNT_DELETED, { username: name });

            res.status(USER_DELETED.code).json(USER_DELETED.message);
        } catch (e) {
            next(e);
        }
    }
};
