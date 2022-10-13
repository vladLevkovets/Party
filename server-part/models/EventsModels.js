const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const EventSchema=new Schema({
   
    name:{type:String,required:true,unique:true},
    users:[{
            type:Schema.Types.ObjectId,
            status:String,
            required:true,
            ref:'users'
        }],
        
    },
    {strictQuery:false})





module.exports= mongoose.model("events",EventSchema);