module.exports = class ErrorHandler extends Error {
    constructor(message, status, customCode, isPublic) {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.isPublic = isPublic;

        Error.captureStackTrace(this, this.constructor);
    }
};
