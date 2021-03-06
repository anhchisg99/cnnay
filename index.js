const express = require('express');

const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser  = require('body-parser');
const session = require('express-session');
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const MongoStore = require('connect-mongo')(session);
// Passport Config
require('./config/passport')(passport);
//db


const Product = require('./models/Products');
//mongodb+srv://chi_duong:<haivlk123>@tm-wc4xv.mongodb.net/<batdaulai>?retryWrites=true&w=majority
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/batdaulai',{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost:27017/batdaulai', {useNewUrlParser: true, useUnifiedTopology: true});
//swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "4.1.4",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
/**
 * @swagger
 * /product:
 *  get:
 *    description: Use to request all products
 *    responses:
 *      '200':
 *        description: A successful response
 */
 /**
 * @swagger
 * /product/{user}:
 *  get:
 *    summary: Get product by id
 *    parameters:
 *      - in: path
 *        name: user
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      '201':
 *         description: Sussessfully
 *             
 */
 /**
 * @swagger
 * /product/{id}:
 *  get:
 *    summary: Delete Product by Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      '201':
 *         description: Sussessfully 
 *             
 */
/**
 * @swagger
 * /product/{userId}:
 *  delete:
 *    summary: Choose Product by Id
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      '201':
 *         description: Sussessfully delete product
 *             
 */
//ejs
app.set('views','./views');
app.set('view engine', 'ejs');
// Routes
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
//uploads
app.use('/uploads', express.static('uploads'));
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      store : new MongoStore({ mongooseConnection: mongoose.connection,ttl:  24 * 60 * 60 })
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