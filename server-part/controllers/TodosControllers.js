const TodosModels = require("../models/TodosModels");
const EventsModels = require("../models/EventsModels");

class TodosCons {

async add(req,res){
      let {name,user_id,todos,_id}=req.body;
      console.log(name,user_id,todos,_id)
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
      const party = await EventsModels.create({name,users:[{user_id,status:"invited"}]})
      console.log(party)
      id=party._id
      }
      
      for (let i=0; i<todos.length; i++) {
      
      const task = await TodosModels.create({task:todos[i],event_id:id,status:"wait"})
      console.log(task)
      }
       res.json({ok:true,id:id})
      }
      catch (error) {
        console.log(error)
        return res.json({ error });
       }}
}




async find(req, res) {
      console.log(req.params);
      try {
        debugger
        const tasks = await TodosModels.find(req.params);
        console.log(tasks);
        res.json({ok:true,tasks});
      } catch (error) {
        res.json({ error });
      }
    }

    async delete (req, res){
      console.log(req.body)
      try{
          
          const removed = await TodosModels.deleteMany(req.body);
          res.send({ok:true});
        
      } 
      catch(error){
          res.send({error});
      };
  }






}
module.exports = new TodosCons();




























