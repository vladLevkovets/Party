const TodosModels = require("../models/TodosModels");
const EventsModels = require("../models/EventsModels");

class TodosCons {

async add(req,res){
      let {name,user_id,todos,_id}=req.body;
      console.log(name,user_id,todos)
      var id=_id
      try{ 
      if (!_id){
      const party = await EventsModels.create({name,users:[{user_id,status:"owner"}]})
      console.log(party)
      id=party._id
      }
      
      for (let i=0; i<todos.length; i++) {
      
      const task = await TodosModels.create({task:todos[i],event_id:id,status:"wait"})
      console.log(task)
      }
       res.json(party)
      }
      catch (error) {
        console.log(error)
        return res.json({ error });
       }



      }


}
module.exports = new TodosCons();




























