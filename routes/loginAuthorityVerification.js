const Router = require('koa-router');
const userRegistry = require('../tableBusinessOperateLogic/userRegistry.js');

const router = new Router({
    prefix: '/bbs/userRegistry'
});

router.post('/login', userRegistry.login);

module.exports = router;