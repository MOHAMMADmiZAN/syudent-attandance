const {registerController,loginController} = require('../controllers/auth');
const Auth = require("../middleware/Auth");
const router = require('express').Router();
 const {registerRules}=require('../utils/validation-rules')


// GET /auth/login

router.post('/register',...registerRules,registerController);
router.post('/login', loginController)
router.get('/private', Auth, (req, res) => {

    res.status(200).json({
        message: "Private Route",
        user: req.user
    })
})

module.exports = router;