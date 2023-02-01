const TodosModels = require("../models/TodosModels");
const EventsModels = require("../models/EventsModels");

class TodosCons {

async add(req,res){
      let {name,user_id,todos,_id,version}=req.body;
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
        const party = await EventsModels.create({name,users:[{user_id,status:"owner"}]})
        console.log(party)
        id=party._id
        }
        if(version==="make"){
        for (let i=0; i<todos.length; i++) {      
        const task = await TodosModels.create({task:todos[i],event_id:id,status:"wait"})
        console.log(task)
        }}
        if(version==="suggest"){
               
          const task = await TodosModels.create({task:todos[0],event_id:id,status:"suggested",suggested:true})
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




























