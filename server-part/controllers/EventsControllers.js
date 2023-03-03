const EventsModels = require("../models/EventsModels");
const UsersModels = require("../models/UsersModels")


class EventsCons {

    // async add(req, res) {
    //     let {name,user_id} = req.body;
    //     try{
    //       const here = await EventsModels.create({name,user_id});
    //       console.log(here,here._id.toString())
          
    //       res.json({ ok: true, token })
        
          
    //     }    catch (error) {
    //      return res.json({ error });
    //     }
    //   }


      async find(req, res) {
        console.log(req.params);
        try {
          const events = await EventsModels.find();
          res.json({ok:true,events});
        } catch (error) {
          res.json({error} );
        }
      }


      async findList(req, res) {
        console.log(req.params);
        let data=req.params.data.split("+")
        console.log(data)
        try {
          if(data[1]==="owner"){
          console.log(`${data}`)
          const events = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[1]}`}}});
          console.log(events)
          res.json({ok:true,events});
        }else{
          const invitations = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[1]}`}}});
          console.log(invitations)
          const partys = await EventsModels.find({users:{ $elemMatch: {user_id:`${data[0]}`,status:`${data[2]}`}}});
          console.log(partys)
          res.json({ok:true,invitations,partys});
        }
        } catch (error) {
          console.log(error)
          res.json({error} );
        }
      }



    async findOne(req, res) {
        console.log(req.params._id);
        let members=[]
        try {
          console.log(req.params);
          const event = await EventsModels.findOne(req.params);
          for (let i=0;i<event.users.length;i++){
          let user = await UsersModels.findOne({_id:event.users[i].user_id})
          if (event.users[i].status !=="invited"){
            members.push(user.nickname)
          }
          } 

          res.json({ok:true,members});
          console.log(event,members)
        } catch (error) {
          console.log("error")
          res.json({ error });
        }
      }

      async delete (req, res){
        console.log(req.body);
        let {_id} =req.body
        console.log({_id})
        try {
         
          const events = await EventsModels.deleteOne(req.body);
          res.json({ok:true});
        } catch (error) {
          console.log(error)
          res.json({error} );
        }
    }

    async update(req,res){
      debugger
        let list=[]
       try {
        if(req.body.version==="add"){
        const event= await EventsModels.findOne({_id:req.body._id})         
        list=[...event.users,...req.body.users]
        console.log(list)
        const send = await EventsModels.updateOne({_id:req.body._id},{users:list})
        console.log(send)
        console.log(list)
        res.json({ok:true})
      }else if(req.body.version==="delete"){
        const event= await EventsModels.findOne({_id:req.body._id})         
        list=[...event.users]
        console.log(list)
        let i =list.findIndex(user=>user.user_id===req.body.user_id)
        list.splice(i,1)
        const left = await EventsModels.updateOne({_id:req.body._id},{users:list})
        console.log(left)
        console.log(list)
        res.json({ok:true})
      }else if (req.body.version==="change"){
        list=[...req.body.users]
        console.log(list)
        const send = await EventsModels.updateOne({_id:req.body._id},{users:list})
        console.log(send)
        console.log(list)
        res.json({ok:true})

      }
      }
      catch (error) {
        res.json({ error });
      }
    } 









}
      module.exports = new EventsCons();




































