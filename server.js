const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// CORS will allow the static website to
// communicate with this server.
app.use(cors());


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


// ----------------------------------------
// Start server
// ----------------------------------------

app.listen(PORT, () => {

    console.log(
        `Dice Roller API running on port ${PORT}`
    );

});