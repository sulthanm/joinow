const mongoose = require('mongoose');
const env = require('./environment');

// mongoose.connect(`mongodb://localhost/example`);

const MONGODB_URI = `mongodb+srv://sulthanmogal:Sulthan7866129@cluster0.0yfoq.mongodb.net/${env.db}?retryWrites=true&w=majority`;
mongoose.connect(process.env.MONGODB_URI || MONGODB_URI,
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true
    
    }
);
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting mongodb'));

db.once('open', function(){
    console.log("Connected to Mongodb");
});

module.exports = db;