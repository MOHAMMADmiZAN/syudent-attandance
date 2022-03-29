const {registerController,loginController} = require('../controllers/auth');
const Auth = require("../middleware/Auth");
const router = require('express').Router();

const {body, validationResult} = require("express-validator");


// GET /auth/login
const registerRules = [body('name').trim().isEmpty().withMessage('Name is required').bail().isString().withMessage('Name must be a string'), body('email').isEmpty().withMessage('email is required').bail().normalizeEmail({all_lowercase: true}).isEmail().withMessage('Email not valid'), body('password').isEmpty().withMessage('Password is required').bail().isLength({min: 6}).withMessage('Password must be at least 6 characters long').bail().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).withMessage('Password must Be Valid'),];
const rulesMessage = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

}

router.post('/register',...registerRules,rulesMessage,registerController);
router.post('/login', loginController)
router.get('/private', Auth, (req, res) => {

    res.status(200).json({
        message: "Private Route",
        user: req.user
    })
})

module.exports = router;