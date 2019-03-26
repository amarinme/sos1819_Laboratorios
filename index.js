//CREACION DEL SERVIDOR WEB
var express = require("express");
var app = express();
const port = process.env.PORT || 8080;

//BODY-PARSER PARA PODER USAR JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());


//CONECTARSE A LA BASE DE DATOS
var happiness_stats;

const MongoClient = require("mongodb").MongoClient;
const uri_happiness_stats = "mongodb+srv://sos:sos@sos-d5gvg.mongodb.net/sos?retryWrites=true";
const client_happiness_stats = new MongoClient(uri_happiness_stats, { useNewUrlParser: true });


client_happiness_stats.connect(err => {
    
    if(err) console.log("Error:", err);
    happiness_stats = client_happiness_stats.db("sos1819").collection("happiness-stats");
    console.log("Connected!");
  
});


app.get("/",(req,res)=>{
   console.log("New request!");
   res.send("<html><body>Hi there!</body></html>");
});



/*
  ======================
 |  API REST DE ANA  |
  ======================
*/
//DOCUMENTACION /api/v1/happiness-stats/docs




//CREACION DEL OBJETO "Stat_h"
var Stat_h = {
    initStat: function(country, year, happinessScore, lowerLimitTrust, UpperLimitTrust) {
        this.country = country;
        this.year = year;
        this.happinessScore = happinessScore;
        this.lowerLimitTrust = lowerLimitTrust;
        this.UpperLimitTrust = UpperLimitTrust;
    }
};


//GET /api/v1/happiness-stats/loadInitialData
app.get("/api/v1/happiness-stats/loadInitialData", (req, res) => {
    
        var happinessStat1 = Object.create(Stat_h);
        var happinessStat2 = Object.create(Stat_h);
        var happinessStat3 = Object.create(Stat_h);
        var happinessStat4 = Object.create(Stat_h);
        var happinessStat5 = Object.create(Stat_h);
        
        happinessStat1.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        happinessStat2.initStat("españa", 2008, 7.3, 7.2, 7.4);
        happinessStat3.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        happinessStat4.initStat("ucrania", 2008, 6.1, 6, 6.2);
        happinessStat5.initStat("indonesia", 2006, 6.9, 6.8, 7.0);
        
        happiness_stats.push(happinessStat1);
        happiness_stats.push(happinessStat2);
        happiness_stats.push(happinessStat3);
        happiness_stats.push(happinessStat4);
        happiness_stats.push(happinessStat5);
        
    
    happiness_stats.find({}).toArray((err,hapinessArray)=>{
        
        if(err) console.log("Error: "+err);
            
        if(hapinessArray.length == 0){
            happiness_stats.insert(happinessStat1);
            happiness_stats.insert(happinessStat2);
            happiness_stats.insert(happinessStat3);
            happiness_stats.insert(happinessStat4);
            happiness_stats.insert(happinessStat5);
            console.log("Created new resources in database");
            res.sendStatus(201);
        }
        else{
            console.log("FATAL ERROR !!: Data Base is not empty.");
            res.sendStatus(409);
        }
               
    });
    }
);


//GET /api/v1/happiness-stats 
app.get("/api/v1/happiness-stats", (req, res) => {
    
    happiness_stats.find({}).toArray((err,hapinessArray)=>{
        
        if(err) console.log("Error: "+err);
            
        else{
            console.log("sending resources from database");
        }
            res.sendStatus(409);
        }
        );
    }
    
);

//POST /api/v1/happiness-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/happiness-stats", (req, res) => {
        
        var newStat = req.body;
        
        happiness_stats.find(newStat).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: "+err);
            
            if(hapinessArray.length == 0){
                
                happiness_stats.insert(newStat);
                console.log("Created new resources in database");
                res.sendStatus(201);
                
            }
            else{
                console.log("FATAL ERROR !!: Resource already exists in the database");
                res.sendStatus(409);
            }
        });
    }
);

//GET /api/v1/happiness-stats/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        
         happiness_stats.find({"country":country}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: "+err);
            
            if(hapinessArray.length > 0){
                console.log("Request accepted, sending resource from database");
                res.send(hapinessArray);
            }else{
                console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
            }
    }
);

        
//DELETE /api/v1/happiness-stats/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        happiness_stats.find({"country":country}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: "+err);
            
            if(hapinessArray.length > 0){
                happiness_stats.remove(hapinessArray[0]);
                console.log("Request accepted, sending resource from database");
                res.sendStatus(200);
            }
            else{
                console.log("FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
            }
            
            }
        );
 
    }
);

//PUT /api/v1/happiness-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        
        happiness_stats.find({"country":country}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: "+err);
            
            if(hapinessArray.length > 0){
                happiness_stats.update({"country":country}, updatedStat);
                console.log("Request accepted, sending resource from database");
                res.sendStatus(200);
            }
            else{
                console.log("FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                }
            }
        );
    }
);

//POST /api/v1/happiness-stats/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/happiness-stats/:country", (req, res) => {
        
        console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/happiness-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/happiness-stats", (req, res) => {
        
        console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/happiness-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/happiness-stats", (req, res) => {
        
        happiness_stats.remove({});
        console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

app.listen(port, () => 
    { console.log("Server Ready and Listen in port", port);  
}
);
