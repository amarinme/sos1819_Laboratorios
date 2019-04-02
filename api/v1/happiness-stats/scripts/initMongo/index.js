
module.exports = function() {
    
    var happiness_stats;
    const MongoClient = require("../../../../../node_modules/mongodb").MongoClient;
    const uri_happiness_stats = "mongodb+srv://sos:sos@sos-d5gvg.mongodb.net/sos?retryWrites=true";
    const client_happiness_stats = new MongoClient(uri_happiness_stats, { useNewUrlParser: true });
    
    client_happiness_stats.connect(err => {
    
        if(err) console.log("FATAL ERROR !!:", err);
        //Aquí se realiza la conexión con la BBDD, nuestro suicide_stats toma el valor de las tablas que tengamos en la BBDD
        happiness_stats = client_happiness_stats.db("SOS1819-04-suicide-rates").collection("suicide-rates");
        console.log("Successfully connected to Suicide-Rates DataBase !!");
        
        }
    );
    
    return happiness_stats;
    
}