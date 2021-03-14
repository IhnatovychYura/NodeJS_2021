module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/node-hw-four',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 5000
};
