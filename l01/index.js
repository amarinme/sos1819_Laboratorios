var express = require("express");

var moment = require("moment");

var app = express();

var puerto = process.env.PORT || 8080;

app.get("/",(request, response) => {
    var hora = moment().format('MMMM Do YYYY, h:mm:ss a');
    response.send(hora);
});

app.listen(puerto);


