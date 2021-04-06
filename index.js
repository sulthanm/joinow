const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./mongoose');
// console.log(db);

app.use(express.static('./assets'));
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



const routes = require('./routes/index');
app.use('/', routes);

app.set('view engine', 'ejs');
app.set("views" , "./views");

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port :${port}`);
})

