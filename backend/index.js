const express = require('express');
const connectToMongo = require("./db/db");
const dotenv = require('dotenv')
dotenv.config()
var cors = require('cors')
 
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/",(req,res)=>{
    res.send("hello world");
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
    });
   }
   
app.listen(port,()=>{
    console.log("connected to port 5000");
}) 