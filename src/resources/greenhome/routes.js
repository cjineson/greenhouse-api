const Router = require('koa-router');
const router = new Router();
const handlers = require('./handlers');
var bodyParser = require('koa-body')();

router.get('/', ctx => {ctx.body = process.env.npm_package_name + "@" + process.env.npm_package_version});
router.get('/searchPostcode', bodyParser, handlers.searchPostcode);
router.options('/searchPostcode', bodyParser, handlers.searchPostcode);
router.get('/searchAddress', bodyParser, handlers.searchAddress);
router.options('/searchAddress', bodyParser, handlers.searchAddress);
router.get('/searchRecommendations', bodyParser, handlers.searchRecommendations);
router.options('/searchRecommendations', bodyParser, handlers.searchRecommendations);

module.exports = router;