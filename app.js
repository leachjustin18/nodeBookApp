//Require NPM packages
const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

//Pull in db configureation
var dbConfig = require('./db.config');



//Define port
var port = process.env.PORT || 5000;

//Navgation array
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

//Require our routes
const bookRouter = require('./routes/bookRouter')(nav);
const adminRouter = require('./routes/adminRouter')(nav);
const indexRouter = require('./routes/indexRouter')(nav);
const authRouter = require('./routes/authRouter')(nav);


// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

//Cookie parser
app.use(cookieParser());

//Use session
app.use(session({secret: 'thisISTheSuperSecret'}));

//Passport
const passportConfig = require('./config/passport')(app);


//Set basic view destionation 
app.set('views', __dirname + '/views');

//Define how to handle hbs with express handlebars
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));

//Define view engine
app.set('view engine', 'hbs');


//Connect to db
mongoose.connect(dbConfig.database);

//Routes
app.use('/', indexRouter);
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/auth', authRouter);


//Specify where to look for CSS, JS, etc. 
app.use(express.static(path.join(__dirname, '/public')));

//Listen to port
app.listen(port, (err) => {
    console.log('running on ' + port);
});