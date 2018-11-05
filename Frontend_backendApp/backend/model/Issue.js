const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Issue = new Schema({
    title:{type:String},
    responsible:{type:String},
    description:{type:String},
    severity:{type:String},
    status:{type:String,default:'open'}
});

export  default  mongoose.model("Issue",Issue);