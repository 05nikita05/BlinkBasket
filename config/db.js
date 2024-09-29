const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(function(){
    console.log("Connected to MongoDB");
});

module.exports = mongoose.connection;