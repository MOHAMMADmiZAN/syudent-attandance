const router = require('express').Router();
const {registerController, loginController} = require('../controllers/auth');

const {schemaError, registerSchema} = require("../utils/joiValidationRules");
const User = require("../models/User");


// GET /auth/login


router.post('/register', schemaError(registerSchema), registerController);
router.post('/login', loginController)
router.get('/public', async (req, res) => {
    let user = await User.find()
    return res.status(200).json({
        message: 'Public route', user: user
    })
})

module.exports = router;