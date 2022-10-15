const EventsModels = require("../models/EventsModels");


class EventsCons {

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


      async find(req, res) {
        console.log(req.params);
        try {
          const user = await EventsModels.find(req.params);
          res.json(user);
        } catch (error) {
          res.json({error} );
        }
      }



    async findOne(req, res) {
        console.log(req.params);
        
        try {
          console.log(req.params);
          const user = await EventsModels.findOne(req.params);
          res.json(user);
        } catch (error) {
          res.json({ error });
        }
      }

     










    }
      module.exports = new EventsCons();




































