const { emailActions } = require('../constants');

module.exports = {
    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome msg',
    },
    [emailActions.UPDATE]: {
        templateName: 'update',
        subject: 'Update msg',
    },
    [emailActions.DELETE]: {
        templateName: 'delete',
        subject: 'Delete msg',
    },
};
