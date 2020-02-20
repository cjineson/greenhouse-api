const greenhome = require('./greenhome');
const Router = require('koa-router');
const router = new Router();

router.use(greenhome.routes(), greenhome.allowedMethods());

module.exports = router;
