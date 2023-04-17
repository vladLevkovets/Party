const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema(
    {
      nickname:{type:String,required:true,unique:true},
      password:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      friends:[
         {name:{type:String,required:true},
         nickname:{type:String,required:true},
         user_id:{type:String,required:true}}
      ]
    }
)

module.exports= mongoose.model("users",UserSchema);