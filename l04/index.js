var cool = require("cool-ascii-faces");

var express = require("express");

var app = express();

//en puerto tambien se puede poner 8080 que es el que acepta cloud9, pero lo ponemos de tal forma, que sin saber el puerto podriamos hacerlo igualmente
var port = process.env.PORT || 8080;

app.get("/", (request, response) => {
    response.send(cool());
    console.log("New request received");
});

app.listen(port);
console.log("Server ready !!");
