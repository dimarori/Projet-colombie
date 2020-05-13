let Categorie = require('../models/regionModel');
let connection = require('../db.js');
let categorieList = [];


// affichage liste de categories
exports.categorieList = function (req, response) {
connection.query("SELECT * from Catégorie ", function (error, resultSQL) {
        if (error) {
        response.status(400).send(error);
        }
        else {
        response.status(200);
        categorieList = resultSQL;
        console.log(categorieList);
        response.render('home.ejs', {users:categorieList});
        }
        });  
    }

// Additioner une nouvelle categorie

exports.categorieNew =  function(req, response) {
    let categorieNom =  req.body.categorieNom;   
    let categorie = new Categorie(categorieNom );
  
        connection.query("INSERT INTO Catégorie set ?", categorie, function (error, resultSQL) {
        if(error) {
        response.status(400).send(error);
        }
        else{
        response.status(201).redirect('/categorie');
        }
        });       
}

//mofification d'une categorie 
exports.categorieUpdate =  function(req, response) { 
    let categorieNom =  req.body.categorieNom;      
    let categorie= new Categorie(categorieNom);
    connection.query("UPDATE Catégorie set ? where categorieID = ?", [categorie, req.body.categorieID], function (error, resultSQL) {
        if(error) {
        response.status(400).send(error);
        }
        else{
          response.status(202).redirect('/categorie');
            }
        });
        
    }

// Envoie la formulaire  ADD  pour ajoiter une nouvelle categorie
exports.categorieFormAdd = function(req, response) {
    message = ""
    response.render('CategorieAdd.ejs', {update:false,message:message, categorieID:'-1', categorieNom:""});
     
}

// Envoi la formualire de modification d'une categorie
exports.categorieFormUpdate =function (req, response) {
    let categorieID = req.params.categorieID;
    connection.query("Select * from Catégorie WHERE categorieID = ?", categorieID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            message=""
            response.render('CategorieAdd.ejs', {message:message,update:true, categorieID:categorieID, categorieNom:users[0].categorieNom});
        }
 });
}
//Eliminetion d'une categorie
exports.categorieRemove = function (req, response) {
    let sql = "DELETE FROM `Catégorie` WHERE `Catégorie`.`categorieID` = ?";
    connection.query( sql , [req.params.categorieID], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/categorie');
        }
    }); 
}