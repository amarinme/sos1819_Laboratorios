//INDEX.JS DE V1

console.log("Registering contact API ... !");

module.exports = function(app){
    console.log("Registering greetings API...");
    
    console.log("Registering get/hello...");
    app.get("/hello", (req, res)=>{
        console.log("Hello worl from submodule");
    });
    console.log("get /Hello registered");
};