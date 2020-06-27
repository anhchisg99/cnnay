const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/Users');
const Product = require('../models/Products');
const { ensureAuthenticated,forwardAuthenticated,xinxoAuthenticated } = require('../config/auth');
//register page
router.get('/register',forwardAuthenticated,(req,res)=>{
    res.render('register');
})
router.get('/rko',forwardAuthenticated,(req,res)=>{
    res.render('rko');
    
})
router.post('/rko',forwardAuthenticated,(req,res)=>{

    var users = new User({
        name : req.body.name,
     
    })
    users.save().then(kq =>console.log(kq));
    res.send('thanhcong');
    
})
// Register
router.post('/register', (req, res) => {
    const  name  = req.body.name;
    const  email  = req.body.email;
    const  password  = req.body.password;
    let errors = [];
  
    if (!name || !email || !password ) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,

      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
  //login page
router.get('/login',forwardAuthenticated,(req,res)=>{
    res.render('login');
});
   // Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/check/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    
    res.redirect('/users/login');
  });
  
  //change
router.get('/change/:id',ensureAuthenticated,xinxoAuthenticated,(req,res)=>{
    Product.findByIdAndRemove({_id:req.params.id}).then((kq)=>{
        console.log(kq);
        res.redirect('/users/change');
    })
    
    
});
router.get('/change',ensureAuthenticated,xinxoAuthenticated,(req,res)=>{
    Product.find().then(kq=>{
        res.render('change',{product1:kq})

    });
    
})
  module.exports = router;
