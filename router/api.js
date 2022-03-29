const router = require('express').Router();
const authRoutes = require('./auth');

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running',
  });
});
router.use('/api/v1/auth', authRoutes);



module.exports = router;
