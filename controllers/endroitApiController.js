let Endroit = require('../models/endroitModel');
let connection = require('../db');
let endroitList = [];

// Liste d'endroits
exports.endroitList = function (request, response) {    
    connection.query("Select * from Endroit", function (error, resultSQL) {
        if (error)  {
            response.status(400).json({'message': error});        
        }
        else {
            response.status(200);
            endroitList =  resultSQL;
            console.log( endroitList);
            response.json({users:endroitList});
        }
    });
}

// Additioner un endroit dans la liste 
exports.endroitNew =  function(req, response) {
    let endroitnom =  req.body.endroitnom;
    let endroitdescription = req.body.endroitdescription;
        let endroit = new Endroit(endroitnom,endroitdescription);

    console.log(endroit);
    connection.query("INSERT INTO Endroit set ?", endroit, function (error, resultSQL) {
        if(error) {
            response.status(400).json({'message': error});   
        }
        else{
            response.status(201).json({'message': 'success'}); 
        }
    });
}

// Modifier un endroit
exports.endroitUpdate =  function(request, response) {
    let endroitID = request.params.endroitID;
    let endroitnom =  request.body.endroitnom;
    let endroitdescription = request.body.endroitdescription;

    let endroit = new Endroit(endroitnom,endroitdescription);
    console.log(endroit);
    connection.query("UPDATE Endroit SET ? WHERE endroitID = ?", [endroit, endroitID], function (error, resultSQL) {
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

exports.endroitRemove = function (request, response) {
    let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`endroitID` = ?";
    connection.query( sql , [request.params.endroitID], (error, resultSQL) => {
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
    
 };