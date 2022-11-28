// Setup empty JS object to act as endpoint for all routes
projectData = {};   
// Require Express to run server and routes
const express = require('express');
const app = express();
const port = 8000;
const server = app.listen(port, listening);
const bodyParser = require('body-parser')
// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}
app.post("/all",function(req,res){
    const data=req.body;
    projectData.Temp=data.Temp;
    projectData.Date=data.Date;
    projectData.Feel=data.Feel;
})
app.get("/all",function(req,res){
    res.send(projectData);
})
