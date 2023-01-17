// describes the server/API

const express = require("express"); // access to Express Library

const {goats, nextId } = require("./goats");

const app = express(); // Make a very basic server using Express

// Tell the app what kinds of requests to listen for (and how to handle them)

app.get("/", (req, res) => { // req read info, res read info and send off
    res.json({
        "message": "Welcome to the GOAT API!"
    })
})

app.get("/goats", (req, res) => {
    res.json(goats);
})

app.get("/goats/:id", (req, res) => {

    // console.log(req.oarams);
    const id = req.params["id"];

    // Filter the goat list for the relevant goat
    console.log(goats);
    const goat = goats.filter(g => g["id"] == id)[0];
    
    if (goat) {
        // send out mighty goat
        res.json(goat);
    } else {
        // send a status of 404 messsage
        res.status(404).json({
            error: "No such Goat"
        })
    }

    console.log(goats);

    res.json(goat);
})

module.exports = app; // Make the server available to other files
