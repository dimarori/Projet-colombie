let express = require('express');
let categorieroutes = express.Router();              

// Import contact controller
var categorieController = require('../controllers/categorieController');
let categorieControllerApi = require('../ControllersAPI/categorieApiController');

categorieroutes.get('/', (req, response) => response.redirect('/categorie'));
// routes 
categorieroutes.get('/categorie', categorieController.categorieList);
categorieroutes.get('/categorie/add', categorieController.categorieFormAdd);
categorieroutes.post('/categorie/new', categorieController.categorieNew);
categorieroutes.post('/categorie/Update', categorieController.categorieUpdate);
categorieroutes.get('/categorie/update/:categorieID', categorieController.categorieFormUpdate);
categorieroutes.get('/categorie/delete/:categorieID', categorieController.categorieRemove);

// routes API
categorieroutes.get('/api/users/', categorieControllerApi .categorieList);
categorieroutes.post('/api/users/', categorieControllerApi .categorieNew);
categorieroutes.put('/api/users/:categorieID', categorieControllerApi .categorieUpdate);
categorieroutes.delete('/api/users/:categorieID', categorieControllerApi .categorieRemove);

module.exports = categorieroutes;