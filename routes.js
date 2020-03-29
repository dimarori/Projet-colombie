// les variables que vont appler les middleware que s'occupe traitement de routes 
let express = require('express');
let router = express.Router();              

// Import contact controller
var endroitController = require('./controllers/endroitController');
let endroitControllerApi = require('./controllers/endroitApiController');

router.get('/', (req, response) => response.redirect('/endroit'));

router.get('/endroit', endroitController.endroitList);
router.get('/endroit/add', endroitController.endroitFormAdd);
router.post('/endroit/new', endroitController.endroitNew);
router.post('/endroit/Update', endroitController.endroitUpdate);
router.get('/endroit/update/:endroitID', endroitController.endroitFormUpdate);
router.get('/endroit/delete/:endroitID', endroitController.endroitRemove);

// route API
router.get('/api/users', endroitControllerApi.endroitList);
router.post('/api/users', endroitControllerApi.endroitNew);
router.put('/api/users/:endroitID', endroitControllerApi.endroitUpdate);
router.delete('/api/users/:endroitID', endroitControllerApi.endroitRemove);

 module.exports = router;