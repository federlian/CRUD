const {
    ErrorInstance,
    errors: {
        VERY_BIG_FILE,
        WRONG_FILE_EXTENSION
    }
} = require('../../error');
const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    FILE_MAX_LENGTH
} = require('../../constants/constants');

module.exports = {
    checkFilePhoto: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const photos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (size > FILE_MAX_SIZE) {
                        throw new ErrorInstance(VERY_BIG_FILE.message, VERY_BIG_FILE.code);
                    }

                    if (FILE_MAX_LENGTH >= docs.length) {
                        docs.push(allFiles[i]);
                    }
                } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > PHOTO_MAX_SIZE) {
                        throw new ErrorInstance(VERY_BIG_FILE.message, VERY_BIG_FILE.code);
                    }

                    if (FILE_MAX_LENGTH >= photos.length) {
                        photos.push(allFiles[i]);
                    }
                } else {
                    throw new ErrorInstance(WRONG_FILE_EXTENSION.message, WRONG_FILE_EXTENSION.code);
                }
            }

            req.photos = photos;
            req.docs = docs;

            next();
        } catch (e) {
            next(e);
        }
    }
};
