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

app.use(express.json()); // layer to read body of POSTS
app.use(cors()); // apply middleware to all files. Layer to add CORS headers
app.use(logger); // Layer to log access

// Endpoints 

app.get("/", (req, res) => { // req read info, res read info and send off
    // console.log("/GET"); -> this is where to use middleware
    res.json({
        "message": "Welcome to the GOAT API!"
    })
})


app.get("/goats", (req, res) => {
    
    // console.log("QUERY STUFF: ", req.query);

    // extract query params 
    const { maxAge } =req.query;

    if (maxAge) {
        res.json(goats.filter(g => g["age"] <= maxAge));
    } else {
        res.json(goats);
    }

})

app.post("/goats", (req, res) => {
    // res.json({post: true})
    // some is sending us information
    // extract the information
    const newGoat = req.body;

    // add goat id to data
    newGoat["id"] = nextId;

    // increase the nextId for next time
    nextId += 1;

    // add goat to the goat list
    goats.push(newGoat); // push newGoat onto the array

    // report our success
    // console.log(newGoat);
    // res.json({"goat": "not created yet"})
    res.status(201).json(newGoat);
})

// root / endpoint
app.get("/goats/:id", (req, res) => {

    // console.log(req.params);
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

// purge the goats with the mighty click of a button
app.delete("/goats/:id", (req, res) => {

    // Pull out the id from the URL
    const id = req.params["id"];

    // Check if that goat is real
    const exists = goats.filter(g => g["id"] == id).length == 1;

    // If it is, 
    if (exists){ 
        // Delete goat
        goats = goats.filter(g => g["id"] != id);

        // Return relevant status and message
        res.status(200).json({
            message: `Goat ${id} deleted.`
        })

        // or send status and no message (204)
        // res.sendStatus(204).json;
    
    // Otherwise
    } else {
        res.status(404).json({
            error: "No such goat!"
        });
    }
    
        // Return 404
})

module.exports = app; // Make the server available to other files
