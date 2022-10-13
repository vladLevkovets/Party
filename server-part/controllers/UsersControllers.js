const UsersModels = require("../models/UsersModels");
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;




class UsersCons {
    async add(req, res) {
        let {password,password2, email,nickname} = req.body;
        if (!email || !password || !nickname){
          return res.json({
            ok: false,
            message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
          });}
        if (!validator.isEmail(email)){
          return res.json({
            ok: false,
            message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS",
          });}
         if (password!==password2) {
            return res.json({
                ok:false,
                message:"passwords doesn't matched"
            })
         }
        try {
          const user = await UsersModels.findOne({ email }) 
          let ex = await UsersModels.findOne({ nickname });
          if (ex || user){
           return res.json({
              ok: false,
              message: `USER OR EMAIL IS ALLREADY EXIST `,
            })
          }else{
            
          const hash = await argon2.hash(password);
          const here = await UsersModels.create({ nickname, password: hash, email});
          console.log(here,here._id.toString())
          const token = jwt.sign({email,nickname,_id:here._id}, jwt_secret, { expiresIn: "365d" });
          console.log(token)
          
          res.json({ ok: true, token })
        }
          
        } catch (error) {
         return res.json({ error });
        }
      }

      async login(req, res) {
        const { nickname, password } = req.body;
        if (!nickname || !password){
         return res.send({ ok: false, message: "All field are required" });
        }
        try {
          const user = await UsersModels.findOne({ nickname });
          console.log(user)
          if (!user) {
           return res.send({ ok: false, message: "invalid data provided" });
          }
          const match = await argon2.verify(user.password, password);
          console.log(match)
          if (match) {
            // once user is verified and confirmed we send back the token to keep in localStorage in the client and in this token we can add some data -- payload -- to retrieve from the token in the client and see, for example, which user is logged in exactly. The payload would be the first argument in .sign() method. In the following example we are sending an object with key userEmail and the value of email coming from the "user" found in line 47
            const token = jwt.sign({nickname,email:user.email,status:user.status,_id:user._id,Bdate:user.Bdate,country:user.country,slogan:user.slogan,city:user.city}, jwt_secret, { expiresIn: "7d" }); //{expiresIn:'365d'}
            // after we send the payload to the client you can see how to get it in the client's Login component inside handleSubmit function
           return res.json({ ok: true, token });
          } else {
           return res.send({ ok: false, message: "invalid data provided" });
          }
        }
         catch (error) {
         return res.send({ ok: false, error });
        }
      }

      async verify_token(req, res) {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        let decoded=jwt.decode(token)
        if (decoded) {
        var email=jwt.decode(token).email
        console.log(email)
        
        try{
        
        const present= await  UsersModels.findOne({email})
        console.log(present)
        if (present) {
           jwt.verify(token, jwt_secret, (err, succ) => {
            console.log(token, jwt_secret)
          err
            ? res.json({ ok: false, message: "something went wrong" })
            : res.json({ ok: true, succ });
        })
      }else{
        res.json({ ok: false, message: "something went wrong" })}
      }catch (error) {
        res.json({ error });
      }}else{
        res.json({ok:false})
      }}

      async findOne(req, res) {
        console.log(req.params);
        try {
          console.log(req.params.nickname);
          const user = await UsersModels.findOne(req.params);
          res.json(user);
        } catch (error) {
          res.json({ error });
        }
      }

      async delete (req, res){
        let {email} = req.body;
        console.log(req.body)
        try{
            let man=await UsersModels.findOne({email})
            console.log(man)
            // const match = await argon2.verify(man.password, password)
            // console.log(match)
          // if (match){
            const removed = await UsersModels.deleteOne({email});
            res.send({ok:true});
            // }
            // else if (!match){
            //   res.send({ok:false,message:"WRONG PASSWORD"})
            // }
            
        } 
        catch(error){
            res.send({error});
        };
    }













}



module.exports = new UsersCons();