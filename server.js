// Database called nedb on npm
// Database to store data, don't forget autoload: true
var Datastore = require('nedb');
var db = new Datastore({filename: "data.db", autoload: true});

// Make webservers easier to make in Node
var express = require('express');
<<<<<<< HEAD

=======
>>>>>>> 9d1db752392a224f8a6b6134a1bd3ee754a5f5ef
var app = express()

// Tell express server that want a "public" director
// any files will be directly available
// image.gif http://myserver/image.gif
// You might put HTML, CSS, JS, images, videos
app.use(express.static('public'));

// Embedded JavaScript
// templates in views folder using ejs code
// <% code here %>
// set the view engine to ejs
app.set('view engine', 'ejs');

// we want to deal with cookies in express
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// take cookies a step further and do server side session database
var session = require('express-session');
// Use nedb to store session data
var nedbstore = require('nedb-session-store')(session);

// Generate unique user ids
const uuidv1 = require('uuid/v1');

<<<<<<< HEAD


=======
>>>>>>> 9d1db752392a224f8a6b6134a1bd3ee754a5f5ef
// Setting up sessions
app.use(
	session(
		{
			secret: 'secret',  // secret is the key - look this up
			cookie: {
				 maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
			 },  // How long a browser should store a cookie
			store: new nedbstore({
			 filename: 'sessions.db'
		 }),  // where to store session data
			resave: true,
		    saveUninitialized: true
		}
	)
);

// a function that's called on every request
// No matter what is requested, this will get called
// Express Middleware
app.use(function(req, res, next) {

	// Have we seen them before?
	if (!req.session.uuid) {
		req.session.uuid = uuidv1();  // create UUID
		console.log("New User: " + req.session.uuid);
	} else {
		// They already have a uuid
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
	// update last visit to now
	req.session.lastvisit = Date.now();

	// What did they request?
	console.log("Requested: " + req.originalUrl);
	
	req.session.additionalInfo = req.headers;
<<<<<<< HEAD
	
	req.session.geolocation = getCallerIP(req);

	console.log(getCallerIP(req));
=======

>>>>>>> 9d1db752392a224f8a6b6134a1bd3ee754a5f5ef
	//console.log(req.headers)

	next();

});

<<<<<<< HEAD
function getCallerIP(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip[0];
}

=======
>>>>>>> 9d1db752392a224f8a6b6134a1bd3ee754a5f5ef
// http://yourserver/
app.get('/', function (req, res) {
	// Use EJS to render main.ejs and send as HTML
	res.render('main.ejs', req);
	
/*	
	res.redirect('https://www.google.com/maps/place/329+State+St,+Brooklyn,+NY+11217/@40.68828,-73.9867403,18z/data=!3m1!4b1!4m5!3m4!1s0x89c25a4d0661e359:0xd3236b7ba40f026b!8m2!3d40.68828!4d-73.985646');
	*/
});

// http://yourserver/image
app.get('/image', function (req, res) {
	console.log(req.query);
	if (req.query.source) {
		var history = [];
		if (req.session.history) {
			history = req.session.history;
		}
		history.push({source: req.query.source,
			date: Date.now()});
		req.session.history = history;
	}
	console.log(history);
	res.sendFile(__dirname + "/public/image.png");
});

// Run the server on port 80 the default web port
app.listen(80)
console.log("Server is running on port 80");
