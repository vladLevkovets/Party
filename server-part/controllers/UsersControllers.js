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
            return res.json({ok: false,message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS   все ",});
        }
        if (validator.isEmail(email)==false){
            return res.json({ok: false,message: "WRONG DATA PROVIDED FILL IN AND CHECK ALL FIELDS   мьіло",});
        }
        if (password!==password2) {
            return res.json({ok:false,message:"passwords doesn't matched  пароль"})
        }
        try {
            const user = await UsersModels.findOne({ email }) 
            let ex = await UsersModels.findOne({ nickname });
            if (ex || user){
                return res.json({ok: false,message: `USER OR EMAIL IS ALLREADY EXIST `})
            }
            else{              
                const hash = await argon2.hash(password);
                const here = await UsersModels.create({ nickname, password: hash, email});
                const token = jwt.sign({email,nickname,_id:here._id}, jwt_secret, { expiresIn: "365d" });          
                res.json({ ok: true, token })
            }          
        } 
        catch (error) {
            return res.json({ error });
        }
    }

    async login(req, res) {
        const { nickname, password } = req.body;
        if (!nickname || !password){
            return res.send({ ok: false, message: "All fields are required" });
        }
        try {
            const user = await UsersModels.findOne({ nickname });
            if (!user) {
                return res.send({ ok: false, message: "invalid data provided" });
            }
            const match = await argon2.verify(user.password, password);
            if (match) {
                const token = jwt.sign({nickname,email:user.email,_id:user._id}, jwt_secret, { expiresIn: "365d" }); 
                return res.json({ ok: true, token });
            } 
            else {
                return res.send({ ok: false, message: "invalid data provided" });
            }
        }
        catch (error) {
            return res.send({ ok: false, error });
        }
    }

    async verify_token(req, res) {
        const token = req.headers.authorization;
        let decoded=jwt.decode(token)
        if (decoded) {
            var email=jwt.decode(token).email

            try{        
                const present= await  UsersModels.findOne({email})
                if (present) {
                    jwt.verify(token, jwt_secret, (err, succ) => {
                        err
                            ? res.json({ ok: false, message: "something went wrong" })
                            : res.json({ ok: true, succ });
                    })
                }
                else{
                    res.json({ ok: false, message: "something went wrong" })}
            }catch (error) {
                res.json({ error });
            }
        }
        else{
           res.json({ok:false})
        }
    }

    async findOne(req, res) {
        try {
            const user = await UsersModels.findOne(req.params);
            if (user!==null){
                res.json({ok:true,user:user});
            }
            else{
                res.json({ok:false})
            }
        } 
        catch (error) {
            res.json({ error });
        }
    }


    async update(req,res){
        try {
            const done = await UsersModels.updateOne({nickname:req.body.nickname},{friends:req.body.friends})
            const user = await UsersModels.findOne({nickname:req.body.nickname});
            res.json({ok:true,user:user})
        }
        catch (error) {
            res.json({ error });
        }
    }


    // async delete (req, res){
    //     let {email} = req.body;
    //     try{
    //         let man=await UsersModels.findOne({email})
            // const match = await argon2.verify(man.password, password)
            // console.log(match)
          // if (match){
            // const removed = await UsersModels.deleteOne({email});
            // res.send({ok:true});
            // }
            // else if (!match){
            //   res.send({ok:false,message:"WRONG PASSWORD"})
            // }
            
    //     } 
    //     catch(error){
    //         res.send({error});
    //     };
    // }

}
module.exports = new UsersCons();