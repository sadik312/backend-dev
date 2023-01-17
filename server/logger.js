// Describes the middleware that logs any attempt to talk to the API.
// req -> [logger (console.log key details)] -> [app] -> response 

function logger(req, res, next) {
    // req - the client's request
    // res - the response that will be sent to the client
    // next - the next step down in the API

    // log key details
    console.log(req.method, req.originalURL);
    // GET / 
    // POST goats
    // PING goats/1

    // pass down to next layer
    next(); // basic middleware; next is function by Express that will be given to another layer
    // res.send("Access not allowed"); extremely strict auth layer
}


module.exports = logger;

// app.use -> express will call this function, in the right order, passing in 3 args (req, res, next(layer))
