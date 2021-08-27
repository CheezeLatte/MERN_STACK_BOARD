const { Router } = require('express');
const controller = require('./controller');
const { requireLoggedIn, isAdmin } = require('../../middlewares/auth');
const router = Router();

// 유저관련 어드민 권한
router.get('/users', isAdmin, controller.findUsers);//ok 유저 전체 가져오기 page, limit 쿼리
router.get('/users/:id', isAdmin, controller.findUser);//ok 특정 유저 가져오기
router.put('/users/:id', isAdmin, controller.updateUser);//ok 유저 정보 업데이트

//개시판 컨트롤
router.post( '/posts', requireLoggedIn, controller.createPost);
router.get('/posts', requireLoggedIn, controller.getPosts);
router.get('/post/:id', requireLoggedIn, controller.getPost);
router.patch( '/update/:id', requireLoggedIn, controller.updatePost);
router.delete( '/delete/:id', requireLoggedIn, controller.deletePost);

module.exports = router;
