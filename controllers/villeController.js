let Ville = require('../models/villeModel');

let connection = require('../db.js');
let villeList = [];
let currentCat = '';
let filtredList = [];

//affichage de la liste de ville en tenant ne compte la ville d'appartenence
exports.villeList = function (req, response) {
    currentCat = req.params.idcategorie;
    connection.query("SELECT * from Ville WHERE categorieID = ?", req.params.idcategorie ,function (error, resultSQL) {
      if (error) {
        response.status(400).send(error);
        }
        else {
        response.status(200);
        villeList = resultSQL;
        console.log(resultSQL)
        response.render('ville.ejs', {users:villeList});
        }
        });  
    }
        
    // Add une ville dasn la liste
    
exports.villeNew =  function(req, response) {
    let villeNom =  req.body.villeNom;
    let categorieID = currentCat;
    let ville= new Ville(villeNom, categorieID);
        
    connection.query("INSERT INTO Ville set ?", ville, function (error, resultSQL) {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.status(201).redirect('/ville/'+currentCat);
            console.log(resultSQL)
         }
    });
            
 }
    
    // Envoie la formulaire  ADD ville
exports.villeFormAdd = function(req, response) {
    
    response.render('villeAdd.ejs', {villeID:'-1', villeNom:"",categorieID:""});       
}
            //mofifier une ville
exports.villeUpdate =  function(req, response) {  
    let villeNom =  req.body.villeNom; 
    
    let categorieID = currentCat;
    
    let ville = new Ville (villeNom, categorieID );
  
    connection.query("UPDATE Ville set ? where villeID = ?", [ville, req.body.villeID], function (error, resultSQL) {
    //connection.query("SELECT * FROM Ville set ? WHEREvilleID = ?", [ville, req.body.villeID], function (error, resultSQL) {
        if(error) {
            response.status(400).send(error);
        }
        else{
        //console.log(resultSQL)
        response.status(202).redirect('/ville/'+currentCat);
        }
    });
}
    
 
    
    // Envoi la formualire de modification 
exports.villeFormUpdate =function (req, response) {
    let villeID = req.params.villeID;
    connection.query("Select * from Ville WHERE villeID = ?", villeID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            message=""
            response.render('villeup.ejs', { villeID:villeID, villeNom:users[0].villeNom});
        }
    });
}


    // effacer une ville en tenant en compte la table Endroit
    exports.villeRemove = function (req, response) {
       // console.log(req.params.villeID)
       let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`villeID` = ?";
        connection.query( sql , [req.params.villeID], (error, resultSQL) => {
            if(error) {
                response.status(400).send(error);
            }
            else{
                let sql = "DELETE FROM `Ville` WHERE `Ville`.`villeID` = ?";
                connection.query( sql , [req.params.villeID], (error, resultSQL) => {
                    if(error) {
                        response.status(400).send(error);
                    }
                    else{
                        
                    response.redirect('/ville/'+currentCat)
                    }
                }); 
                //response.redirect('/ville');
            }
        }); 
    }
exports.villesFilter = function(req,response){
    filtredList =  villeList.filter(list => list.villeNom.includes(req.body.villeNom));
    response.render('ville.ejs', {villeList: filtredList})
    }