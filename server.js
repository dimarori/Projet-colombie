let express    = require('express');        // call express
let app        = express();                 // define our app using express

//let connection = require('./db.js');

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin",
    "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
    res.status(200).end();
    } else { next(); }
    });

// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Import routes
      
let categorie= require ('./allroutes/categorieRoutes');
let ville= require ('./allroutes/villeroutes');
let endroit = require('./allroutes/routes');

app.use('/', categorie);
app.use('/', ville);
app.use('/', endroit);



app.use('/public', express.static('public'))
// Launch app to listen to specified port
var port = 8080
app.listen(port, function () { console.log('Running server on port ' + port); })

