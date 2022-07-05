const mongoose = require('mongoose');

const mongUrl = "mongodb://localhost:27017/pizza?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = ()=> {
    mongoose.connect(mongUrl,()=>{
        console.log("connected to database");
    })
}

module.exports = connectToMongo;