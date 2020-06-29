const express = require('express');

const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser  = require('body-parser');
const session = require('express-session');


const app = express();
// Passport Config
require('./config/passport')(passport);
//db


const Product = require('./models/Products');
//mongodb+srv://chi_duong:<haivlk123>@tm-wc4xv.mongodb.net/<batdaulai>?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/batdaulai',{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost:27017/batdaulai', {useNewUrlParser: true, useUnifiedTopology: true});

//ejs
app.set('views','./views');
app.set('view engine', 'ejs');
// Routes
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Routes
  const product = require('./routes/product');
  app.use('/product',product);
app.use('/check', require('./routes/index.js'));
app.use('/users', require('./routes/users'));



app.get('/',(req,res)=>{
    Product.find({}).then(kq=>{
        res.render("trangchu", {product:kq});
    })

   
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));