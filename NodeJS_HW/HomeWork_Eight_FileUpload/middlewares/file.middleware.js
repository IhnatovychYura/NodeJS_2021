const { ErrorHandler } = require('../error');
const {
    statusCode,
    statusMessages,
    constants: {
        FILE_MAX_SIZE, PHOTO_MAX_SIZE, DOCS_MIMETYPES, PHOTOS_MIMETYPES, VIDEOS_MIMETYPES, VIDEO_MAX_SIZE
    }
} = require('../constants');

module.exports = {
    checkFileMiddleware: (req, res, next) => {
        try {
            const { files } = req;
            const { prefLang = 'en' } = req.query;
            console.log(files);

            const docs = [];
            const photos = [];
            const videos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(
                            statusMessages.OVER_SIZE_FILE.message[prefLang],
                            statusCode.BAD_REQUEST,
                            statusMessages.OVER_SIZE_FILE.customCode
                        );
                    }

                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (size > FILE_MAX_SIZE) {
                        throw new ErrorHandler(
                            statusMessages.OVER_SIZE_FILE.message[prefLang],
                            statusCode.BAD_REQUEST,
                            statusMessages.OVER_SIZE_FILE.customCode
                        );
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (size > VIDEO_MAX_SIZE) {
                        throw new ErrorHandler(
                            statusMessages.OVER_SIZE_FILE.message[prefLang],
                            statusCode.BAD_REQUEST,
                            statusMessages.OVER_SIZE_FILE.customCode
                        );
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(
                        statusMessages.NOT_VALID_FILE.message[prefLang],
                        statusCode.BAD_REQUEST,
                        statusMessages.NOT_VALID_FILE.customCode
                    );
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = photos;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkAvatar: (req, res, next) => {
        try {
            const { prefLang = 'en' } = req.query;

            if (req.photos.length > 1) {
                throw new ErrorHandler(
                    statusMessages.AVATAR_QUANTITY.message[prefLang],
                    statusCode.BAD_REQUEST,
                    statusMessages.AVATAR_QUANTITY.customCode
                );
            }

            // req.avatar = req.photos[0]; // більш зрозуміло, але лінтер вимагає нижню деструктуризацію
            [req.avatar] = req.photos;
            next();
        } catch (e) {
            next(e);
        }
    },
};
