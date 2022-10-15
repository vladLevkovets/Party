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
      // const list= await TodosModels.find({id})
       res.json(id)
      }
      catch (error) {
        console.log(error)
        return res.json({ error });
       }
}




async find(req, res) {
      console.log(req.params);
      try {
        console.log();
        const tasks = await TodosModels.find(req.params);
        res.json(tasks);
      } catch (error) {
        res.json({ error });
      }
    }


}
module.exports = new TodosCons();




























