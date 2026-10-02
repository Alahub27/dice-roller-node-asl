const express = require('express')
app = express()

const cors = require("cors")

var url = require('url');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

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

// CHAT GPT was used to create this API to modify the add-two-integers API to turn it into a random number generator API. The user can specify the number of sides on the die, and the server will return a random number between 1 and that number of sides. If the user does not specify a number of sides, the server will default to 6 sides.
app.get('/random-number', (request, response) => {
	console.log('Calling "/random-number" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let sides = parseInt(inputs.sides)
	if (isNaN(sides) || sides < 1) sides = 6
	let roll = Math.floor(Math.random() * sides) + 1
	response.type('text/plain')
	response.send(roll.toString())
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