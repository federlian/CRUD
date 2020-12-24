const { errors: { JUST_ONE_PHOTO, VERY_BIG_FILE }, ErrorInstance } = require('../../error');
const { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES } = require('../../constants/constants');

module.exports = {
    checkAvatar: (req, res, next) => {
        const photo = req.photos;

        try {
            if (photo.length > 1) {
                throw new ErrorInstance(JUST_ONE_PHOTO.message, JUST_ONE_PHOTO.code);
            }

            const { photos: { mimetype, size } } = req;

            if (PHOTOS_MIMETYPES.includes(mimetype)) {
                if (PHOTO_MAX_SIZE < size) {
                    throw new ErrorInstance(VERY_BIG_FILE.message, VERY_BIG_FILE.code);
                }
            }

            [req.avatar] = req.photos;

            next();
        } catch (e) {
            next(e);
        }
    }
};
