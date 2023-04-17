const EventsModels = require("../models/EventsModels");
const UsersModels = require("../models/UsersModels")


class EventsCons {

  async find(req, res) {
    try {
      const events = await EventsModels.find();
          res.json({ok:true,events});
    } 
    catch (error) {
          res.json({error} );
    }
  }


  async findList(req, res) {
    let data=req.params.data.split("+")
    try {
      if(data[1]==="owner"){
        const events = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[1]}`}}});
        res.json({ok:true,events});
      }
      else{
        const invitations = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[1]}`}}});
        const partys = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[2]}`}}});
        res.json({ok:true,invitations,partys});
      }
    } 
    catch (error) {
      res.json({error} );
    }
  }

  async findOne(req, res) {
    let members=[]
    try {
      const event = await EventsModels.findOne(req.params);
      for (let i=0;i<event.users.length;i++){
        let user = await UsersModels.findOne({_id:event.users[i].user_id})
        if (event.users[i].status !=="invited"){
          members.push(user.nickname)
        }
      } 

      res.json({ok:true,members});
    } 
    catch (error) {
      res.json({ error });
    }
  }

  async delete (req, res){
    let {_id} =req.body
    try {         
      const events = await EventsModels.deleteOne(req.body);
      res.json({ok:true});
    } 
    catch (error) {
      res.json({error} );
    }
  }

  async update(req,res){

    let list=[]
    try {
      if(req.body.version==="add"){
        const event= await EventsModels.findOne({_id:req.body._id})         
        list=[...event.users,...req.body.users]
        const send = await EventsModels.updateOne({_id:req.body._id},{users:list})
        res.json({ok:true})
      }
      else if(req.body.version==="delete"){
        const event= await EventsModels.findOne({_id:req.body._id})         
        list=[...event.users]
        let i =list.findIndex(user=>user.user_id===req.body.user_id)
        list.splice(i,1)
        const left = await EventsModels.updateOne({_id:req.body._id},{users:list})
        res.json({ok:true})
      }
      else if (req.body.version==="change"){
        list=[...req.body.users]
        const send = await EventsModels.updateOne({_id:req.body._id},{users:list})
        res.json({ok:true})
      }
    }
    catch (error) {
      res.json({ error });
    }
  } 

}
     
module.exports = new EventsCons();




































