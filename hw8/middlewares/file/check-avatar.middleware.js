const { errors: { JUST_ONE_PHOTO, VERY_BIG_FILE }, ErrorInstance } = require('../../error');
const { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES } = require('../../constants/constants');

module.exports = {
    checkAvatar: (req, res, next) => {
        const { files } = req;
        const photo = Object.values(files);

        try {
            if (photo.length > 1) {
                throw new ErrorInstance(JUST_ONE_PHOTO.message, JUST_ONE_PHOTO.code);
            }
            for (let i = 0; i < photo.length; i++) {
                const { mimetype, size } = photo[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorInstance(VERY_BIG_FILE.message, VERY_BIG_FILE.code);
                    }

                    req.avatar = photo[i];
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
