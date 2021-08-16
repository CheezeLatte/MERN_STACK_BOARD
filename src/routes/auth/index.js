const { Router } = require('express');
const { requireLoggedIn } = require('../../middlewares/auth');
const controller = require('./controller');

const router = Router();

router.post('/login', controller.login); //ok
router.get('/logout', controller.logout); //ok
router.get('/me', requireLoggedIn, controller.getMe);//ok
router.post('/token/refresh', controller.refreshToken); //ok
router.put('/me', requireLoggedIn, controller.updateMe); //ok
router.post('/users', controller.register);//ok 유저 등록

module.exports = router;
