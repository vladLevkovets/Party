const express = require('express'),
      router  = express.Router(),
  controller  = require('../controllers/EventsControllers')



  // router.post('/add',controller.add);
  router.post('/delete',controller.delete);
  router.post('/update',controller.update);
  router.get('/find',controller.find);
  router.get('/find/:data',controller.findList)
  router.get('/:_id',controller.findOne);

module.exports = router;