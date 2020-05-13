let Endroit = require('../models/endroitModel');
let connection = require('../db.js');
let endroitList = [];
let currentVille = '';
let endroitToUpdate = '';
let filtreList = [];

//affichage des endroits en tenant en compte la ville à laquelle il appartient

exports.endroitList = function (req, response) {
    currentVille = req.params.idVille;
    connection.query("SELECT * FROM Endroit WHERE villeID = ?", req.params.idVille, function (error, resultSQL) {
        if (error) {
        response.status(400).send(error);
        }
        else {
        response.status(200);
        endroitList = resultSQL;
        
        response.render('endroitList.ejs', {users:endroitList});
        }
    });  
}
exports.endroitFilter = function(req,response){
    filtreList =  endroitList.filter(list => list.endroitnom.includes(req.body.endroitnom));
    response.render('endroitList.ejs', {endroitList: filtreList})
}
   
// Addiotioner un nouveau endroit
exports.endroitNew =  function(req, response) {
    let endroitnom =  req.body.endroitnom;   
    let villeID = currentVille ;
   
    let endroit = new Endroit  (endroitnom, villeID );
    
        connection.query("INSERT INTO Endroit set ?", endroit, function (error, resultSQL) {
        if(error) {
        response.status(400).send(error);
        }
        else{
           
        response.status(201).redirect('/endroit/'+currentVille);
        }
     });      
}
// Envoie la formulaire  ADD pour ajouter un nouveau endroit
exports.endroitFormAdd = function(req, response) { 
  response.render('endroitAdd.ejs', {endroitID:'-1', endroitnom:"",villeID:currentVille});
}
//mofifier un endroit
exports.endroitUpdate =  function(req, response) {  
    let endroitnom =  req.body.endroitnom;
    let villeID = currentVille;  
    
    let endroit = new Endroit(endroitnom,villeID);
    connection.query("UPDATE Endroit set ? where endroitID = ?", [endroit, endroitToUpdate], function (error, resultSQL) {
    
        if(error) {
        response.status(400).send(error);
        }
        else{
           
       response.status(202).redirect('/endroit/'+currentVille);
            }
        });
        
    }


// Envoi la formualire de modification d'un endroit
exports.endroitFormUpdate =function (req, response) {
    let endroitID = req.params.endroitID;
    endroitToUpdate = req.params.endroitID;
    console.log(endroitToUpdate)
    connection.query("SELECT * FROM Endroit WHERE endroitID = ?", endroitID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            users = resultSQL;
            response.render('endroitUP.ejs', {endroitID:endroitID, endroitnom:users[0].endroitnom});
        }
 });
}
// effacer un endroit en tenant en compte sa FK à laquelle il appartient
exports.endroitRemove = function (req, response) {
    let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`villeID` = ?";
        connection.query( sql , [req.params.villeID], (error, resultSQL) => {
            if(error) {
                response.status(400).send(error);
            }
            else{
                let sql = "DELETE FROM `Endroit` WHERE `Endroit`.`endroitID` = ?";
                    connection.query( sql , [req.params.endroitID], (error, resultSQL) => {
                    if(error) {
                        response.status(400).send(error);
                    }
                    else{
                        response.redirect('/endroit/'+currentVille);
                    }
            });
        }   
    }); 
}
