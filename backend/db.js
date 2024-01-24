const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://kavindadissanayake1999:Perfect21893@cluster0.5eo4z7d.mongodb.net/MERN-COLOMBO-RESTUARENT'


mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})
  .catch(err => {
    console.log('MongoDB connection failed:', err);
  });

var db = mongoose.connection;

db.on('connected',()=>{
    console.log('Mongo DB connection Success');
});

db.on('error',()=>{
    console.log('Mongo DB connection Failed');
});

module.exports=mongoose;