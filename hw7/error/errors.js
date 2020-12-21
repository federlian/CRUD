const {
    CREATED, NO_CONTENT, BAD_REQUEST, OK, FORBIDDEN, NOT_FOUND, UNAUTHORIZED
} = require('../config/error-codes');

module.exports = {
    NOT_VALID_ID: {
        message: 'User ID must be grater than 0',
        code: BAD_REQUEST
    },

    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST,
    },

    USER_CREATED: {
        message: 'User successfully created',
        code: CREATED
    },

    OK_REQUEST: {
        message: 'The request has succeeded',
        code: OK
    },

    USER_DELETED: {
        message: 'User successfully deleted',
        code: NO_CONTENT
    },

    EMAIL_EXIST: {
        message: 'User with this email already exist',
        code: FORBIDDEN
    },

    NOT_EXIST_IN_BASE: {
        message: 'Car not exist in base',
        code: NO_CONTENT
    },

    ID_NOT_FOUND: {
        message: 'User is not present',
        code: NOT_FOUND
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Email or password is not valid',
        code: BAD_REQUEST
    },
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    }
};
