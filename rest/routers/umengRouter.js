// import UmengController from '../controllers/umengController'
const UmengController = require('../controllers/umengController');
const  router = require('koa-router')();

router.get('/test', UmengController.test)
  .post('/api/u_send', UmengController.send)

module.exports = router;