const mongoose= require('mongoose');
const Schema=mongoose.Schema;


const TodoSchema=new Schema({
    event_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'events'
    },
    task:{type:String,required:true},
    status:{type:String},
    booked:{type:Boolean},
    bookedBy:{type:String},
    done:{type:Boolean},
    doneBy:{type:String},
    voted:{type:Boolean},
    votedBy:[{type:Object}],
    suggested:{type:Boolean},
})

module.exports= mongoose.model("todos",TodoSchema);