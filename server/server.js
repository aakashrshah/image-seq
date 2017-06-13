var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname,"../app/dist")));
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   console.log(req.query.q);
// });

app.listen(3000,function(){
    console.log("Started listening on port", 3000);
})

mongoose.connect("mongodb://localhost/schoolfinder");
