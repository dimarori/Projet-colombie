// les variables que vont appler les middleware que s'occupe traitement de routes 
let express = require('express');
let router = express.Router();              

// Import contact controller
var endroitController = require('../controllers/endroitController');
let endroitControllerApi = require('../ControllersAPI/endroitApiController');

router.get('/', (req, response) => response.redirect('/endroit'));
// routes 
router.get('/endroit/add', endroitController.endroitFormAdd);
router.get('/endroit/:idVille', endroitController.endroitList);
router.post('/endroit/new', endroitController.endroitNew);
router.get('/endroit/filter', endroitController.endroitFilter);
router.post('/endroit/Update', endroitController.endroitUpdate);
router.get('/endroit/update/:endroitID', endroitController.endroitFormUpdate);
router.get('/endroit/delete/:endroitID', endroitController.endroitRemove);


// routes API
router.get('/api/usersendroit', endroitControllerApi.getEndroit);
router.get('/api/usersendroit/:idVille', endroitControllerApi.endroitList)
router.get('/api/usersendroit/', endroitControllerApi.endroitList);
router.post('/api/usersendroit/', endroitControllerApi.endroitNew);
router.put('/api/usersendroit/:endroitID', endroitControllerApi.endroitUpdate);
router.delete('/api/usersendroit/:endroitID', endroitControllerApi.endroitRemove);

 module.exports = router;