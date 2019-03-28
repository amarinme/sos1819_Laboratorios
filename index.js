var express = require("express");

var app = express();

var port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("<html><body>Hello World!</body></html>");
});

app.listen(port);