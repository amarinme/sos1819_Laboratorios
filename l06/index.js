var express = require("express");
var bodyparser = require("body-parser");
var app = express();


app.use(bodyparser.json);

var port = process.env.PORT || 8080;

var contacts = [{
    name: "peter",
    phone: "123456",
    email: "peter@peter.com"
    },{
    name: "paul",
    phone: "3333",
    email: "paul@paul.com"
    }];
    
    //GET /contacts/
     app.get("/contacts", (req,res)=>{
    res.send(contacts);
    });
    
    //POST /contacts/
    app.post("/contacts", (req, res)=>{
        var newContact = req.body;
        contacts.push(newContact)
        
        res.sendStatus(201);
    })

    // POST /contacts/
    
    app.post("/contacts", (req,res)=>{
    
    var newContact = req.body;
    
    contacts.push(newContact)
    
    res.sendStatus(201);
});

    // DELETE /contacts/
    app.post("/contacts", (req, res)=>{
        contacts = [];
        res.sendStatus(200);
    });
    
    // GET /contacts/peter
    
    app.get("/contacts/:name", (req,res)=>{

    var name = req.params.name;

    var filteredContacts = contacts.filter((c) =>{
       return c.name == name; 
    })
    
    if (filteredContacts.length >= 1){
        res.send(filteredContacts[0]);
    }else{
        res.sendStatus(404);
    }

    });

    // PUT /contacts/peter
    
    app.put("/contacts/:name", (req,res)=>{

    var name = req.params.name;
    var updatedContact = req.body;
    var found = false;

    var updatedContacts = contacts.map((c) =>{
    
        if(c.name == name){
            found = true;
            return updatedContact;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendStatus(200);
    }

    });
    // DELETE /contacts/peter
    
    app.delete("/contacts/:name", (req,res)=>{

    var name = req.params.name;
    var found = false;

    var updatedContacts = contacts.filter((c) =>{
        
            if(c.name == name)  
                found = true;
        
            return c.name != name;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        contacts = updatedContacts;
        res.sendStatus(200);
    }

    });

    
    
    
    //--------------------//

app.listen(port, () => {
    console.log("Super server ready on port" +port);
});