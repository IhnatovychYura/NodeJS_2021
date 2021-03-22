module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/node-hw-four',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: process.env.PORT || 5000,
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'testmail@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '123456aA',
};
