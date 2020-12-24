module.exports = {
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),

    DIALECT: 'mysql',

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    FILE_MAX_SIZE: 10 * 1024 * 1024,
    FILE_MAX_LENGTH: 10,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ]
};
