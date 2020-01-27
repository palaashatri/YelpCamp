var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground",campgroundSchema);
// Campground.create(
//     {
//         name : "Granite Hill", 
//         image:"https://pixabay.com/get/57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c722672d1904fc35c_340.jpg"
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND :");
//             console.log(campground);
//         }
//     });

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    //GET ALL CG from DB
    Campground.find({},function (err,allCampgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
    
});

app.post("/campgrounds",function (req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name : name, image : image};
   //create a new CG and save to DB
   Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
             //redirect back to campgrounds page 
             res.redirect("/campgrounds");
        }
   });
  
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(5000, function () {
    console.log("Server has started");
});