let Endroit = require('../models/endroitModel');
let connection = require('../db');
let endroitList = [];


// Liste d'endroits
exports.endroitList = function (req, response) {
   
    connection.query("SELECT * from users.Endroit WHERE villeID = ?", req.params.idVille, function (error, resultSQL) {
          if (error)  {
            response.status(400).json({'message': error});        
        }
        else {
            response.status(200);
            endroitList =  resultSQL;
            response.json({Endroit:endroitList});
        }
    });
}

// Additioner un endroit dans la liste 
exports.endroitNew =  function(req, response) {
    let endroitnom =  req.body.endroitnom;   
    let villeID = req.body.villeID ;
   
    let endroit = new Endroit  (endroitnom, villeID );

    connection.query("INSERT INTO Endroit set ?", endroit, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});   
        }
        else{
            response.status(201).json({'message': 'success'}); 
        }
    });
}

exports.getEndroit = function(req,response){

    connection.query("SELECT * from users.Endroit ", function (error, resultSQL) {
        if (error)  {
          response.status(400).json({'message': error});        
      }
      else {
          response.status(200);
          endroitList =  resultSQL;
          response.json({Endroit:endroitList});
      }
  });
}

// Modifier un endroit
exports.endroitUpdate =  function(req, response) {
    let endroitnom =  req.body.endroitnom;
    let endroitID = req.body.endroitID;
    let villeID = req.body.villeID;  
    
    let endroit = new Endroit(endroitnom,villeID);
    connection.query("UPDATE Endroit set ? where endroitID = ?", [endroit, endroitID], function (error, resultSQL) {
     if(error) {
            response.status(400).json({'message': error});  
        } else if (resultSQL.affectedRows != 1) {
            console.log(resultSQL.affectedRows);
            response.status(400).json({'message': "Erreur SQL "});  
        }
        else{
            response.status(202).json({'message': 'success'}); 
        }
    });
}
//eliminer un endroit en tenat en compte le villeID
exports.endroitRemove = function (req, response) {
    let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`villeID` = ?";
        connection.query( sql , [req.params.villeID], (error, resultSQL) => {
        
        if(error) {
            response.status(400).json({'message': error});  
        } else {
        let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`endroitID` = ?";
            connection.query( sql , [req.params.endroitID], (error, resultSQL) => {
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