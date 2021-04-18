const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./mongoose');
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const localSession = require('./passport');
const sassMiddleware = require('node-sass-middleware');

const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMware = require('./middleware');

app.use(sassMiddleware({
    src : './',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));
app.use(express.urlencoded());

app.use(cookie());

app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set("views" , "./views");

app.use(session({
    name : 'Joinow',
    //todo 
    secret : 'blahSom',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 10)
    
    },
    store : new MongoStore(
    {
        mongooseConnection : db,
        autoSave : 'disabled'
    },
    function(err){
        console.log(err || 'connect to mongo-db');
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
});

app.use(flash());
app.use(customMware.setFlash);


const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port :${port}`);
})

