//Credits to ChatGPT for modifying  and providing the code to work with the static web application and node js server correctly.
const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3


app.use(express.static(__dirname + '/static'))
//code that will execute the static web applicaton and node js server correctly
//When the user presses roll dice button, the request will be sent to the node js server and the response will be sent back to the static web application displaying the result of the dice roll.
app.use(cors({ origin: '*' }))

// The CORS code is commented out, but when not commented and commenting out the line of code above, will cause cors error if the origin is not set to the correct domain.
//This means when the user presses the roll dice buttton, it will not work because the request will be blocked by the browser due to cors policy.

//app.use(cors({ origin: 'https://your-frontend-domain.co ' }))

// The app.get functions below are being processed in Node.js running on the server.
app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})

app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

// Roll a die on the server. The number of sides is passed in on the URL,
// e.g. /roll-dice?sides=6 or /roll-dice?sides=20. Returns a number from 1 to sides.
app.get('/roll-dice', (request, response) => {
	console.log('Calling "/roll-dice" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let sides = parseInt(inputs.sides)
	if (isNaN(sides) || sides < 1) sides = 6
	let roll = Math.floor(Math.random() * sides) + 1
	response.type('text/plain')
	response.send(roll.toString())
})


// ----------------------------------------
// Wake-up API
// ----------------------------------------

app.get("/api/wakeup", (req, res) => {

    res.json({
        status: "awake",
        message: "Dice Roller Node.js server is running"
    });

});


// ----------------------------------------
// Roll one die
// Example: /api/roll/6
// ----------------------------------------

app.get("/api/roll/:sides", (req, res) => {

    const sides = parseInt(req.params.sides);

    if (isNaN(sides) || sides < 2) {

        return res.status(400).json({
            error: "Number of sides must be at least 2."
        });

    }

    // RANDOM NUMBER IS GENERATED ON THE SERVER
    const roll =
        Math.floor(Math.random() * sides) + 1;

    res.json({
        sides: sides,
        roll: roll
    });

});


// ----------------------------------------
// Roll multiple dice
// Example: /api/roll/2/6
// ----------------------------------------

app.get("/api/roll/:dice/:sides", (req, res) => {

    const dice =
        parseInt(req.params.dice);

    const sides =
        parseInt(req.params.sides);

    if (
        isNaN(dice) ||
        isNaN(sides) ||
        dice < 1 ||
        sides < 2
    ) {

        return res.status(400).json({
            error: "Invalid number of dice or sides."
        });

    }

    const rolls = [];

    for (let i = 0; i < dice; i++) {

        const roll =
            Math.floor(Math.random() * sides) + 1;

        rolls.push(roll);
    }

    res.json({
        dice: dice,
        sides: sides,
        rolls: rolls
    });

});


// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)