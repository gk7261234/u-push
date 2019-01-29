const router = require('koa-router')();
// import UmengController from '../controllers/umengController'
const UmengController = require('../controllers/umengController');
const pushValidate = require('../middlewares/formValidate/push');

router.get('/test', UmengController.test)
  .post('/api/u_send', pushValidate.push_validate, UmengController.send)

module.exports = router;