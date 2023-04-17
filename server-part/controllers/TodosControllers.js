const TodosModels = require("../models/TodosModels");
const EventsModels = require("../models/EventsModels");

class TodosCons {

  async add(req,res){
      let {name,user,user_id,todos,_id,version}=req.body;
      var id=_id
      if (!name){
        res.json({ok:false, message:"enter party name"})
      }
      if (todos.length===0){
        res.json({ok:false, message:"enter atleast one task"})
      }
      else{
        try{ 
          if (!_id){
            const party = await EventsModels.create({name,users:[{user_id,status:"owner"}],progress:"0%"})
            id=party._id
          }
          if(version==="make"){
            for (let i=0; i<todos.length; i++) {      
              const done = await TodosModels.create({task:todos[i],event_id:id,status:"wait"})  
            }
            const  all = await TodosModels.find({event_id:id});
            const eventTasks = await TodosModels.find({event_id:id});
            const doneTasks =await TodosModels.find({event_id:id,status:"done"});
            let percentage= Math.round((doneTasks.length/eventTasks.length)*100);
            const pro = await EventsModels.updateOne({_id:id},{progress:`${percentage}%`});
            res.json({ok:true,all:all})
          }   
        
          if(version==="suggest"){              
            const task = await TodosModels.create({task:todos[0],event_id:id,status:"suggested",suggested:true,voted:true,votedBy:[user]})
            const  all = await TodosModels.find({event_id:id})
            res.json({ok:true,all:all})
          }
        
        }
        catch (error) {
          return res.json({ error });
        }}
  }




  async find(req, res) {
      try {
        const tasks = await TodosModels.find(req.params);
        res.json({ok:true,tasks});
      } 
      catch (error) {
        res.json({ error });
      }
  }

  async delete (req, res){
      try{          
        const removed = await TodosModels.deleteMany(req.body);
        res.send({ok:true});        
      } 
      catch(error){
          res.send({error});
      };
  }

  async update(req,res){
      try {
        const todo = await TodosModels.findOne({_id:req.body._id});
        if (req.body.nickname){
          let list = [...todo.votedBy,req.body.nickname]        
          const done = await TodosModels.updateOne({_id:req.body._id},{votedBy:list})
          const team= await EventsModels.findOne({_id:todo.event_id})
          let choose = list.length/team.users.length
          if (choose>(0.5)){
            const work = await TodosModels.updateOne({_id:req.body._id},{status:"wait"})
          }
        }
        else if (req.body.status){
          if (req.body.status==="booked" && todo.status==="wait"){
            const done = await TodosModels.updateOne({_id:req.body._id},{status:req.body.status,booked:true,bookedBy:req.body.name})
          }
          else if(req.body.status==="done" && todo.status!=="done"){
            const done = await TodosModels.updateOne({_id:req.body._id},{status:req.body.status,done:true,doneBy:req.body.name})           
          }
        }
        const eventTasks = await TodosModels.find({event_id:todo.event_id,status:{$ne:"suggested"}});
        const doneTasks =await TodosModels.find({event_id:todo.event_id,status:"done"});
        let percentage= Math.round((doneTasks.length/eventTasks.length)*100)
        const pro = await EventsModels.updateOne({_id:todo.event_id},{progress:`${percentage}%`})   
        res.json({ok:true})    
      }
      catch (error) {
        res.json({ error });
      }
  }

}
module.exports = new TodosCons();




























