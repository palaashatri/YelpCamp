var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX : Show all camgrounds from DB
router.get("/",function(req,res){
    //GET ALL CG from DB
    Campground.find({},function (err,allCampgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
    
});

//CREATE ROUTE : add a new campground to DB
router.post("/",middleware.isLoggedIn,function (req,res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id:req.user._id,
       username:req.user.username
   };
   var newCampground = {name : name, image : image, description : desc,author:author};
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

//NEW :  Displays form to add a new CG to DB
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//SHOW : Displays more data about particular CG from DB (should be after every NEW route)
router.get("/:id",function(req,res){
    //Find CG with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
                res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

// edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});
        });
});


// update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.body.params.id);
        }
    });
});

//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;