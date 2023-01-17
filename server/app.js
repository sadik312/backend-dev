// describes the server/API

const express = require("express"); // access to Express Library
const cors = require("cors") // access to cors library

const {goats, nextId } = require("./goats");
const logger = require("./logger");

const app = express(); // Make a very basic server using Express

// Tell the app what kinds of requests to listen for (and how to handle them)

// Middleware
// req -> [middleware] -> [endpoint] -> response
// goes in between to manipulate req as it comes along
// req -> [cors] -> [API] -> response
// later req -> [auth (check the req headers for a key)] -> [API] -> response

app.use(cors()); // apply middleware to all files
app.use(logger);

// Endpints 

app.get("/", (req, res) => { // req read info, res read info and send off
    // console.log("/GET"); -> this is where to use middleware
    res.json({
        "message": "Welcome to the GOAT API!"
    })
})


app.get("/goats", (req, res) => {
    
    // console.log("QUERY STUFF: ", req.query);

    // extract qeuery oarams 
    const { maxAge } =req.query;

    if (maxAge) {
        res.json(goats.filter(g => g["age"] <= maxAge));
    } else {
        res.json(goats);
    }

})

// root / endpoint
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
