var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds = [
    {name : "Salmon Creek", image:"https://pixabay.com/get/57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c722672d1904fc35c_340.jpg"},
    {name : "Granite Hill", image:"https://pixabay.com/get/57e6d7454e53ae14f6da8c7dda793f7f1636dfe2564c704c722672d1904fc35c_340.jpg"},
    {name : "Mountain Goat's Rest", image:"https://pixabay.com/get/55e9d043485baa14f6da8c7dda793f7f1636dfe2564c704c722672d1904fc35c_340.jpg"}
];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function (req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name : name, image : image};
   campgrounds.push(newCampground);
   //redirect back to campgrounds page 
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(5000, function () {
    console.log("Server has started");
});