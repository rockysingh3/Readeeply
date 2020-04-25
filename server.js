const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');




const app = express();

// Passport config
require('./config/passport')(passport);

/* Importing configuration for mongoDB */
const db = require('./config/keys').MongoURI;
/* Connecting to MongoDB */
mongoose.connect(db, { useNewUrlParser: true })
    /* if connection is succusful display this message */
    .then(() => console.log('MongoDB Connected..'))
    /* else throw an error */
    .catch(err => console.log(err))




/* Setting up middlewear for express */
app.use(express.static(__dirname + '/public'));
    // setting up ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Using bodyParser
app.use(express.urlencoded({ extended: true }));



// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// passport middleware
// always put it after express session
app.use(passport.initialize());
app.use(passport.session());



// rendering all the Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/book', require('./routes/books'));


/* Impoting port number from config 
   this is where the local server will run on */
let PORT = require('./config/keys').PORT


/* initilizing listen so the server can run on PORT */
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})