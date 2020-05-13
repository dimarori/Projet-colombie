let Categorie = require('../models/regionModel');
let connection = require('../db.js');
let categorieList = [];


// affichage de la liste de categorie
exports.categorieList = function (req, response) {
connection.query("SELECT * from Catégorie ", function (error, resultSQL) {
        if (error) {
            response.status(400).json({'message': error}); 
        }
        else {
        response.status(200);
        categorieList = resultSQL;
        console.log(categorieList);
        response.json({users:categorieList});
        }
        });  
    }

// Add categorie  dans la liste

exports.categorieNew =  function(req, response) {
    let categorieNom =  req.body.categorieNom;   
    let categorie = new Categorie(categorieNom );
  
        connection.query("INSERT INTO Catégorie set ?", categorie, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        }
        else{
            response.status(201).json({'message': 'success'}); 
        }
        });       
}

        //mofifier une categorie 
exports.categorieUpdate =  function(req, response) { 
    let categorieNom =  req.body.categorieNom;      
    let categorie= new Categorie(categorieNom);
    connection.query("UPDATE Catégorie set ? where categorieID = ?", [categorie, req.body.categorieID], function (error, resultSQL) {
         if(error) {
            response.status(400).json({'message': error}); 
        }
        else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'success'}); 
        }
        });
        
    }
//eliminer une categorie
exports.categorieRemove = function (req, response) {
    let sql = "DELETE FROM `Catégorie` WHERE `Catégorie`.`categorieID` = ?";
    connection.query( sql , [req.params.categorieID], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else {
            response.json({'message': 'success'});
        }
    }); 
}