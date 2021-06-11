const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting mongodb'));

db.once('open', function(){
    console.log("Connected to Mongodb");
});

module.exports = db;