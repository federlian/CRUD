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
    ],

    EMAIL_TEMPLATES_PATH: 'email-templates',

    PUBLIC_CARS_PATH: 'cars',
    PUBLIC_CARS_FILES_PATH: 'files',
    PUBLIC_PATH: 'public',
    PUBLIC_USERS_PATH: 'users',
    PUBLIC_USERS_PHOTOS_PATH: 'photos',

    CAR_ID: 'car_id',
    CASCADE: 'CASCADE',
    ID: 'id',
    MODEL_CAR: 'Car',
    MODEL_DOCUMENT: 'Document',
    MODEL_O_AUTH: 'O_Auth',
    MODEL_USER: 'User',
    NOW: 'NOW',
    TABLE_NAME_CARS: 'cars',
    TABLE_NAME_DOCUMENTS: 'documents',
    TABLE_NAME_O_AUTH: 'o_auth',
    TABLE_NAME_USERS: 'users',
    USER_ID: 'user_id'
};
