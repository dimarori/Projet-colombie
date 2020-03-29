let Endroit = require('../models/endroitModel');
let connection = require('../db.js');
let endroitList = [];

// List of users
exports.endroitList = function (req, response) {
  
    connection.query("SELECT * from Endroit;", function (error, resultSQL) {
        if (error) {
        response.status(400).send(error);
        }
        else {
        response.status(200);
        endroitList = resultSQL;
        console.log( endroitList);
        response.render('endroitList.ejs', {users:endroitList});
        }
        });
}

// Add one user in the list
exports.endroitNew =  function(req, response) {
    let endroitnom =  req.body.endroitnom;
    let endroitdescription = req.body.endroitdescription;
        let endroit = new Endroit(endroitnom,endroitdescription);
        console.log(endroit);
        connection.query("INSERT INTO Endroit set ?", endroit, function (error, resultSQL) {
        if(error) {
        response.status(400).send(error);
        }
        else{
        response.status(201).redirect('/endroit');
        }
        });
    }
        //mofifier
    exports.endroitUpdate =  function(req, response) {  
        let endroit = new Endroit(endroitnom,endroitdescription);
        console.log(endroit);
        connection.query("UPDATE Endroit set ? where endroitID = ?", [endroit, req.body.endroitID], function (error, resultSQL) {
            if(error) {
            response.status(400).send(error);
            }
            else{
                response.status(202).redirect('/endroit');
            }
        });
    }

// Envoie la formulaire endroit
exports.endroitFormAdd = function(req, response) {
    response.render('endroitAdd.ejs', {endroitID:'-1', endroitnom:"", endroitdescription:""});
}

// Envoi la formualire de modification 
exports.endroitFormUpdate =function (req, response) {
    let endroitID = req.params.endroitID;
    connection.query("Select * from Endroit WHERE endroitID = ?", endroitID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            response.render('endroitAdd.ejs', {endroitID:endroitID, endroitnom:users[0].endroitnom, endroitdescription:users[0].endroitdescription});
        }
 });
}
// effacer usuaire
exports.endroitRemove = function (req, response) {
    let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`endroitID` = ?";
    connection.query( sql , [req.params.endroitID], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/endroit');
        }
    }); 
}