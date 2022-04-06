const router = require('express').Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');
const morgan = require("morgan");
const Auth = require("../middleware/Auth");



router.use(morgan((tokens, req, res) => {
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        message: tokens.res(req, res, 'message'),
        time: tokens.date(req, res, 'iso'),
        duration: tokens.res(req, res, 'response-time')
    })
}));

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is up and running',
    });
});
router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users',Auth, userRoutes);


module.exports = router;
