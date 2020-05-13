let Ville = require('../models/villeModel');

let connection = require('../db.js');
let villeList = [];

//affichage liste d'endroits
exports.villeList = function (req, response) {
    connection.query("SELECT * from users.Ville WHERE categorieID = ?", req.params.idCategorie ,function (error, resultSQL) {
        if (error) {
          response.status(400).json({'message': error}); 
          }
          else {
          response.status(200);
          villeList = resultSQL;
          console.log(resultSQL)
          response.json({Ville:villeList});
          }
          });  
    }
    exports.getville = function(req,response){

        connection.query("SELECT * from users.Ville ", function (error, resultSQL) {
            if (error)  {
              response.status(400).json({'message': error});        
          }
          else {
              response.status(200);
              villeList =  resultSQL;
              response.json({Ville:villeList});
          }
      });
    }
        
    // Add une ville dans la liste
    
exports.villeNew =  function(req, response) {
    let villeNom =  req.body.villeNom;
    let categorieID = req.body.categorieID;
    let ville= new Ville(villeNom, categorieID);
        
    connection.query("INSERT INTO Ville set ?", ville, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});  
        }
        else{
            response.status(201).json({'message': 'success'}); 
          
        }
    });
            
 }
    
//mofifier une ville
exports.villeUpdate =  function(req, response) {  
    let villeNom =  req.body.villeNom; 
    let categorieID = req.body.categorieID;
    let villeID= req.body.villeID;
    
    let ville = new Ville (villeNom, categorieID );
  
    connection.query("UPDATE Ville set ? where villeID = ?", [ville,villeID], function (error, resultSQL) {
    
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
    
    // effacer une ville en tenant en compte le la table endroit
    exports.villeRemove = function (req, response) {
       // console.log(req.params.villeID)
       let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`villeID` = ?";
        connection.query( sql , [req.params.villeID], (error, resultSQL) => {
        
        if(error) {
            response.status(400).json({'message': error});  
        } else {
  
       let sql = "DELETE FROM `Ville` WHERE `Ville`.`villeID` = ?";
           connection.query( sql , [req.params.villeID], (error, resultSQL) => {
               if(error) {
                   response.status(400).json({'message': error});
                }
                   if (resultSQL.affectedRows != 1) {
                       console.log(resultSQL.affectedRows);
                       response.status(400).json({'message': "Erreur SQL "});  
                   }
                   else {
                   response.json({'message': 'success'}); 
                   }
           });
       } 
    });
}   
 
    
