# Node JS server: Website Dice Roller - Pigs Lite Game
## Author: Alanna San Luis
### Class: Software Engineering

### Credits
ChatGPT, W3Schools was used for the HTML, CSS, and JSS coding
Eric Pogue for the MERNA node js template repository.


## Descriptions:
This project is a Node.js and Express-based Web Service API for the Dice Roller application. The server is hosted in Microsoft Azure and the code of this has RESTful APIs that allow the Pig Lite static web application to request randomly generated dice numbers from the server.

All random numbers for the Dice Roller application are generated on the Node.js server rather than in the web browser. The server provides API endpoints for waking up the server, generating random dice rolls, testing connectivity, and checking the server version. The project also includes an index.html API testing page that allows the RESTful APIs to be tested without implementing the Pig Lite game itself. The actual Pig Lite game is hosted separately as an Azure Static Web App.

## RESTful APIs

The Node.js server provides RESTful API endpoints including:

/api/wakeup - Wakes up the Node.js server and confirms that it is running.
/api/roll/:sides - Generates a random number based on the number of sides requested.
/api/roll/:dice/:sides - Generates multiple random dice rolls.
/api/ping - Tests communication with the server.
/version - Displays the current server version.

## Azure Deployment

The Node.js server is deployed as an Azure Web App and is publicly accessible over the internet. The server acts as the backend Web Service for the Pig Lite static web application.

## CORS
Application uses CORS to allow communication between the static web application and the Node js server due to different origin. The code demonstration both working communication of request and response between the static website and the node js server. That line of code is not commented. Also, the code demonstrates a CORS failure by implementing a different origin that does not match, resulting the CORS policy blocking the static web application request. This is shown by the user pressing the roll the dice button, however it will not be working because there is no dice number being displayed. Also, the line of code for this CORS failure is commmented out.


