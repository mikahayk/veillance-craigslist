// Database to store data, don't forget autoload: true
var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

var express = require('express')
var app = express()

app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
var nedbstore = require('nedb-session-store')(session);

const uuidv1 = require('uuid/v1');

app.use(
	session(
		{
			secret: 'secret',
			cookie: {
				 maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
				},
			store: new nedbstore({
			 filename: 'sessions.db'
			}),
			resave: true,
		    saveUninitialized: true
		}
	)
);

// No matter what is requested, this will get called
// Middleware
app.use(function(req, res, next) {

	// Have we seen them before?
	if (!req.session.uuid) {
		req.session.uuid = uuidv1();
		console.log("New User: " + req.session.uuid);
	} else {
		console.log("Returning User: " + req.session.uuid);
	}

	// Count visits
	var visits = 0;
	if (req.session.visits) {
		visits = req.session.visits;
	}
	visits++;
	req.session.visits = visits;
	console.log("Visited " + visits + " times");	
		
	// Track last visit
	if (req.session.lastvisit) {
		console.log("Last Visit: " + req.session.lastvisit);
	}
	req.session.lastvisit = Date.now();

	// What did they request?
	console.log("Requested: " + req.originalUrl);

	//console.log(req.headers)

	next();

});

app.get('/', function (req, res) {
	res.render('main.ejs', req);	
});

app.get('/image', function (req, res) {

	res.sendFile(__dirname + "/public/image.png");
});

app.listen(80)
console.log("Server is running on port 80");
