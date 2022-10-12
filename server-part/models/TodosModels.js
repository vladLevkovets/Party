const mongoose= require('mongoose');
const Schema=mongoose.Schema;


const TodoSchema=new Schema({




    task:{type:String,required:true},
    status:{type:String},
    booked:{type:Boolean},
    bookedBy:{type:String},
    done:{type:Boolean},
    doneBy:{type:String},
    voted:{type:Boolean},
    votedBy:{type:String},
    suggested:{type:Boolean},
    votes:{type:Object}
 })