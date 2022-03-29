const {registerController,loginController} = require('../controllers/auth');
const Auth = require("../middleware/Auth");
const router = require('express').Router();
const {registerRules, rulesMessage} = require("../utils/validationRules");


// GET /auth/login


router.post('/register',...registerRules,rulesMessage,registerController);
router.post('/login', loginController)
router.get('/private', Auth, (req, res) => {

    res.status(200).json({
        message: "Private Route",
        user: req.user
    })
})

module.exports = router;