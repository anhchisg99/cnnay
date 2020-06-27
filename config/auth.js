// Load User model
const User = require('../models/Users');
module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
     
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
       res.redirect('/check/dashboard');      
    },
    xinxoAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            User.findById({_id:req.user.id}).where('role').equals('admin').then(kq =>{
                console.log(kq);
                if(!kq){
                    res.redirect('/users/login');

                }else{
                    next();
                }
            })
        }

    }
  };