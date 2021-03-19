module.exports = {
    TOO_WEAK_PASSWORD: {
        message: {
            en: 'Too weak password',
            ua: 'Ненадійний пароль',
        },
        customCode: 4001,
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: {
            en: 'Wrong email or password',
            ua: 'Некоректно вказана електронна пошта або пароль користувача',
        },
        customCode: 4002,
    },

    USER_EXISTS: {
        messages: {
            en: 'User with this email already exists',
            ua: 'Користувач із такою електронною адресою вже існує'
        },
        customCode: 4003,
        isPublic: true,
    },

    TOKEN_REQUIRE: {
        message: {
            en: 'Token is required',
            ua: 'Необхідно надати токен авторизації',
        },
        customCode: 4004,
    },

    NOT_VALID_ACCESS_TOKEN: {
        message: {
            en: 'Not valid access token by verification',
            ua: 'Некоректний перший (пропускний) токен авторизації',
        },
        customCode: 4011,
    },

    NOT_VALID_REFRESH_TOKEN: {
        message: {
            en: 'Not valid refresh token by verification',
            ua: 'Некоректний другий (оновлюючий) токен авторизації',
        },
        customCode: 4012
    },

    UNAUTHORIZED_USER: {
        message: {
            en: 'User is unauthorized, check if userId is correct',
            ua: 'Неавторизований користувач, перевір ідентифікатор користувача',
        },
        customCode: 4013
    },

    NOT_VALID_TOKEN_DB: {
        message: {
            en: 'Not valid token from DB',
            ua: 'Неіснуючий токен перевірений з бази даних',
        },
        customCode: 4041
    },

    NOT_VALID_ID: {
        en: 'Not valid user id',
        ua: 'Некоректно вказаний ідентифікаційний номер користувача',
    },

    EMPTY_FIELD: {
        en: 'Some field is empty',
        ua: 'Не заповнені всі поля',
    },

    NOT_VALID_EMAIL: {
        en: "Not valid email! Correct email have to contain '@'",
        ua: "Некоректно вказана електронна пошта! Коректна електронка повинна містити '@'",
    },

    USER_CREATED: {
        en: 'New user is created',
        ua: 'Створено нового користувача',
    },

    CAR_CREATED: {
        en: 'New car is created',
        ua: 'Створено новий автомобіль',
    },

    USER_NOT_FOUND: {
        en: "This user doesn't exist",
        ua: 'Такого користувача не існує',
    },

    USER_WAS_UPDATE: {
        en: 'User was update',
        ua: 'Дані користувача змінено',
    },

    USER_WAS_DELETED: {
        en: 'User was deleted',
        ua: 'Дані користувача було видалено',
    },

    CAR_WAS_DELETED: {
        en: 'Car was deleted',
        ua: 'Автомобіль було видалено',
    },
};
