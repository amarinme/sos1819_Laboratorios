var express = require("express");
var contactAPI = require("./greetings-api");
var app = express();

contactAPI(app);
const BASE_PATH = "/api" ;

var port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<html><body>Hello World!</body></html>");
});

app.listen(port);