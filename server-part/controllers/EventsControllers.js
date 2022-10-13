const EventsModels = require("../models/EventsModels");
const UsersModels =require("../models/UsersModels")

class UsersCons {

    async add(req, res) {
        let {name,user_id} = req.body;
        try{
          const here = await EventsModels.create({name,user_id});
          console.log(here,here._id.toString())
          
          res.json({ ok: true, token })
        
          
        }    catch (error) {
         return res.json({ error });
        }
      }






































}