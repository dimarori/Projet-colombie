let express = require('express');
let villeroutes = express.Router();              

    
// Import contact controller
var villeController = require('../controllers/villeController');
var villeControllerApi = require('../controllersAPI/villeApiController');


villeroutes.get('/', (req, response) => response.redirect('/ville'));
// routes 
villeroutes.get('/ville/:idcategorie', villeController.villeList);
villeroutes.get('/ville/add', villeController.villeFormAdd);
villeroutes.post('/ville/new', villeController.villeNew);
villeroutes.post('/ville/Update', villeController.villeUpdate);
villeroutes.get('/ville/update/:villeID', villeController.villeFormUpdate);
villeroutes.get('/ville/delete/:villeID', villeController.villeRemove);
villeroutes.get('/ville/filter', villeController.villesFilter);

// routes API
villeroutes.get('/api/usersville', villeControllerApi.getville);
villeroutes.get('/api/usersville/:idCategorie', villeControllerApi .villeList);
villeroutes.post('/api/usersville/', villeControllerApi .villeNew);
villeroutes.put('/api/usersville/:villeID', villeControllerApi.villeUpdate);
villeroutes.delete('/api/usersville/:villeID', villeControllerApi.villeRemove);


module.exports = villeroutes;