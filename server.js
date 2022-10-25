let express = require('express')
let Datastore = require('nedb');

let db = new Datastore('chat.db');
db.loadDatabase();

let app = express();
app.use(express.json());

const PORT = 3000;


let messages = [];


app.use("/", express.static("public"));




app.post('/message',(req,res)=>{
   // messages.push(req.body);
   // res.send({"task" : "successful"});

   let currentDate = Date();
   let obj = {                                  // Making a Object to pass to the database
       date : currentDate,
       message : req.body
   }

   db.insert(obj,(err,newDocs)=> {
       if(err)
       {
           res.json({task:"task failed"});
       }
       else{
           res.json({task:"success"});
       }
   })
    printMessages();
})

app.get("/message",(req,res)=> {
    
    
db.find({}).sort({updateAt:1}).exec(function(err,docs){
    if(err)
    {
        res.json({task:"task failed"});
    }
    else{
        let obj = {messages:docs};
        res.json(obj);
    }
})
    // res.json({
    //     "msgs" : messages
    // })
})

//spin up a server on port 3000

app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT)
});


function printMessages() {
	messages.forEach(element => {
        console.log(element);
    });
}