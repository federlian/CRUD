const mailAction = require('../constants/email-actions.enum');

module.exports = {
    [mailAction.WELCOME]: {
        subject: 'Welcome to our site',
        templateName: 'welcome'
    },

    [mailAction.ACCOUNT_DELETED]: {
        subject: 'Account is deleted',
        templateName: 'account-deleted'
    }
};
