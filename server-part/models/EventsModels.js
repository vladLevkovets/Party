const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const EventSchema=new Schema({
   
    name:{type:String,required:true},
    users:[{user_id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'users'
        },status:{type:String}}
    ],
      
    },
    {strictQuery:false})





module.exports= mongoose.model("events",EventSchema);