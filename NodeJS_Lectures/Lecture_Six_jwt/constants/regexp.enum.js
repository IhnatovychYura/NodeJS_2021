module.exports = {
    EMAIL_REGEXP: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/),
    PASSWORD_REGEXP: new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
    USERID_REGEXP: new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
};
