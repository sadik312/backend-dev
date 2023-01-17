// run the server/API

const app = require("./app");

// Set the app off listening

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}....`)
}); // port we will be listening on (on a numbered port)
