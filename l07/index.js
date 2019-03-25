var express = require("express");
var app = express();
const port = process.env.PORT || 8080;




app.get("/",(req,res)=>{
    console.log("New request!");
    res.send("<html><body> Hi there!</body></html>")
});


app.listen(port, () =>
{
    console.log("Magic is happening in port "+port)
});