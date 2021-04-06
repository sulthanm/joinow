const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/joinow_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting mongodb'));

db.once('open', function(){
    console.log("Connected to Mongodb");
});

module.exports = db;