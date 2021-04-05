const express = require('express');
const port = 8000;
const app = express();

const routes = require('./routes/index');
app.use('/', routes);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port :${port}`);
})

