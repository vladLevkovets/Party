const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const EventSchema=new Schema({
   


    name:{type:String,required:true,unique:true},
    todos:{type: Schema.Types.ObjectId,
        required:true,
        ref: 'todos'},
    users:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'users'
        },},
    {strictQuery:false})





module.exports= mongoose.model("events",EventSchema);