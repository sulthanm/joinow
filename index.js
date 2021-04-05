const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

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

