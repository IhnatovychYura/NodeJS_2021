const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { ErrorHandler } = require('../error');
const { ROOT_EMAIL_PASSWORD, ROOT_EMAIL } = require('../configs/config');
const { statusMessages, statusCode } = require('../constants');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD,
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const foundTemplate = templatesInfo[action];

        if (!foundTemplate) {
            throw new ErrorHandler(
                statusMessages.WRONG_EMAIL_ACTION.message.ua,
                statusCode.BAD_REQUEST,
                statusMessages.WRONG_EMAIL_ACTION.customCode
            );
        }

        const html = await templateParser.render(foundTemplate.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: foundTemplate.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
