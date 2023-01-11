const express = require('express'),
      router  = express.Router(),
  controller  = require('../controllers/TodosControllers')



  router.post('/add',controller.add);
  router.post('/delete',controller.delete);
  // router.post('/update',controller.update);
  router.get('/find/:event_id',controller.find);


module.exports = router;