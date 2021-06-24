require('dotenv').config();
var express = require('express');
var router = express.Router();
var app = express();
var cors = require('cors');
var loginController = require('../controllers/authenticate-controller');
var registerController = require('../controllers/register-controller');
var itemController = require('../controllers/items-controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const withAuth = require('./middleware');
 
//initialize passport        
app.use(passport.initialize())
//alters the request object and change the user value (id session/client cookie)    
app.use(passport.session())  
//populate req.cookies
app.use(cookieParser());   
//use json   
app.use(bodyParser.json());   
//make the server accessible to any domain that requests a resource from your server via a browser    
app.use(cors);                    

// Login
router.post('/api/authenticate', loginController.authenticate); 

// Register 
router.post('/api/register', registerController.register);

// Reset password
router.post('/api/forgotpassword', loginController.forgotpassword);

// Update password
router.get('/api/reset/:resetPasswordToken', loginController.resetpassword);
router.put('/api/updatePassword', loginController.updatepassword);

// Home page 
router.get('/', function(req, res, next) {
  res.send("Hi, I'm a backend message!");
});

// CREATE
// Save new item
router.post('/api/item', itemController.createItem);

// READ
// Table with all items in the Navigation Two Menu
router.get('/api/item', itemController.itemTable);

// READ
// Item Information (eye button) 
router.get('/api/item/:itemId', itemController.itemInfo);

// UPDATE
// Update item
router.put('/api/item/:itemId', itemController.updateItem);

//DELETE
// Delete item (remove button)
router.delete('/api/item/:itemId', itemController.removeItem);

// Middleware authentication
router.get('/api/dashboards', withAuth, function(req, res) {
  res.send('Hi, Im the backend!');
});

router.get('/api/logged', withAuth, function(req, res) {
  res.send('Oi, eu sou o backend!')
});

router.get('/checkToken', withAuth, function(req, res) {
  console.log("Successfully authenticate with token");
  res.status(200).send("Successfully authenticate with token");
});

module.exports = router;

 