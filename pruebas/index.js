//CREACIÓN DEL SERVIDOR WEB
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

//USO DEL PAQUETE BODY-PARSER PARA MOSTRAR CORRECTAMENTE EL JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//REFERENCIADO A LA CARPETA 'public' DEL NODO RAÍZ DEL SERVIDOR
app.use("/",
    //dir name es la carpeta donde se esta ejecutando node
    express.static(__dirname+"/public"));

//CREACIÓN DEL RECURSO '/time' QUE DEVUELVE LA HORA DEL SERVIDOR
app.get("/time",(request,respone)=>{
    respone.send("Hello");
});





/*
  ======================
 |  API REST DE ANA  |
  ======================
*/
//CREACIÓN DEL OBJETO "stat"
var Stat = {
    initStat: function(country, year, happinessScore, lowerLimitTrust, UpperLimitTrust) {
        this.country = country;
        this.year = year;
        this.happinessScore = happinessScore;
        this.lowerLimitTrust = lowerLimitTrust;
        this.UpperLimitTrust = UpperLimitTrust;
    }
}

var stats = [];

//GET /api/v1/suicide-rates/loadInitialData
app.get("/api/v1/happiness-stats/loadInitialData", (req, res) => {
    
        var stat1 = Object.create(Stat);
        var stat2 = Object.create(Stat);
        var stat3 = Object.create(Stat);
        var stat4 = Object.create(Stat);
        
        stat1.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        stat2.initStat("españa", 2008, 7.3, 7.2, 7.4);
        stat3.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        stat4.initStat("Ucrania", 2008, 6.1, 6, 6.2);
        
        stats.push(stat1);
        stats.push(stat2);
        stats.push(stat3);
        stats.push(stat4);
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/happiness.stats 
app.get("/api/v1/happiness-stats", (req, res) => {
    
        res.send(stats);
    
    }
    
);

//POST /api/v1/happiness-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/happiness-stats", (req, res) => {
        
        var newStat = req.body;
        stats.push(newStat);
        
        res.sendStatus(201);
        res.send("<h1>Resource created successfully.</h1>");
        
    }
);

//GET /api/v1/suicide-rates/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = stats.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.sendStatus(200);
            res.send(filteredStats);
            
        } else {
            
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
            
        }
        
    }
);

        
        //DELETE /api/v1/happiness-stats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/happiness-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = stats.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/happiness-stats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/happiness-stats/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/happiness-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/happiness-stats", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/happiness-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/happiness-stats", (req, res) => {
        
        stats = [];
        res.sendStatus(200);
        res.send("<h1>All resources successfully deleted.</h1>");

        
    }
);
     
 //SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => 
    { console.log("Server Ready and Listen in port", port);  
}
);






