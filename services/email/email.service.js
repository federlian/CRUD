const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { EMAIL_TEMPLATES_PATH } = require('../../constants/constants');
const {
    ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD,
    ROOT_EMAIL_SERVICE
} = require('../../config/config');
const {
    ErrorInstance, errors: {
        WRONG_TEMPLATE
    }
} = require('../../error');

const templatesInfo = require('../../email-templates');

const transporter = mailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        pass: ROOT_EMAIL_PASSWORD,
        user: ROOT_EMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), EMAIL_TEMPLATES_PATH)
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorInstance(WRONG_TEMPLATE.message, WRONG_TEMPLATE.code);
        }

        const html = await emailTemplates.render(templateInfo.templateName, context);

        return transporter.sendMail({
            from: ROOT_EMAIL,
            to: userMail,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
