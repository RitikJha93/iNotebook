const mongoose = require('mongoose');


const connectToMongo = ()=> {
    mongoose.connect(process.env.MONGO_URI,()=>{
        console.log("connected to database");
    })
}

module.exports = connectToMongo;