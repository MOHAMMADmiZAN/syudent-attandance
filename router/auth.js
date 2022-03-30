const router = require('express').Router();
const {registerController,loginController} = require('../controllers/auth');
const Auth = require("../middleware/Auth");
const {schemaError, registerSchema} = require("../utils/joiValidationRules");



// GET /auth/login


router.post('/register',schemaError(registerSchema),registerController);
router.post('/login', loginController)
router.get('/private', Auth, (req, res) => {

    res.status(200).json({
        message: "Private Route",
        user: req.user
    })
})

module.exports = router;