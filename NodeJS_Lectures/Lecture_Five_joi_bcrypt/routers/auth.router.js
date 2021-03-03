const router = require('express').Router();

const { UserModel } = require('../dataBase/models');
const { passwordHasher } = require('../helpers');

router.get('/', (req, res) => {
    res.json('AUTH IS SUCCESS');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error('NO USER');
    }

    await passwordHasher.compare(password, user.password);

    res.json('OK');
});

module.exports = router;
