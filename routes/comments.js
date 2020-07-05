var express = require("express");
var router = express.Router({mergeParams : true}); //{mergeParams:true} refer to :id params in app.js to be used in add new comment route (POST)
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments new
router.get("/new",isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground:campground});
        }
    });
});

//Comments create
router.post("/",isLoggedIn,function(req,res){
    //look up campgrounds using ID
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
             //create new comment
             Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground showpage
                    res.redirect('/campgrounds/' + campground._id);
                }
             });           
        }
    });
});

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;