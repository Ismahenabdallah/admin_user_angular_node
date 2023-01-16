const validator = require("validator");
const asynHandler = require('express-async-handler');
const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const Register = asynHandler(async (req, res) => {
    try {
        const { email, password, confirm } = req.body
        if (!email || !password || !confirm)
            return res.status(400).json({ msg: "Please fill in all fields." })
        if (!validateEmail(email))
            return res.status(400).json({ msg: "Invalid emails." })
        if (!validator.equals(password, confirm))
            return res.status(400).json({ msg: "Passwords not matches." })
        const user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ msg: "email already exist. " })
        const passwordHash = bcrypt.hashSync(password, 12)
        const newUser = new User({
            ...req.body, password: passwordHash, confirm: passwordHash
        })
        //jwt.sign(email, process.env.PRIVATE_KEY, { expiresIn: '15m' })

        await newUser.save()

        res.status(200).json({ newUser, message: "success" });
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})
const Login = asynHandler(async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email || !password)
            return res.status(422).json({ msg: "please add email or password" })

        const user = await User.findOne({email: email})
        if (!user)
            return res.status(400).json({ msg: "This email does not exist." })
         
        
           if (user.status !== "Active")
                return res.status(400).json({ msg: "Please Active your Account in Your Email" })
           ///await is important 
              const isMatch = await bcrypt.compare(password, user.password)
      
                if (!isMatch){
                    return res.status(400).json({ msg: "Password is incorrect." })
        
                }else{
                    var token = jwt.sign({ 
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        status: user.status,
                        // worksAt: user.worksAt,
                        // relationship: user.relationship,
                        // country: user.country,
                        // livesIn: user.livesIn, 
                       }, process.env.PRIVATE_KEY,  { expiresIn: '1h' });
                       res.status(200).json({
                         message: "success",
                         token: "Bearer "+token,
                         role: user.role,
                         
                       })
                }
             
           
       
       
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})
const Login1 = async(req, res)=>{
    
   try {
      const {email, password}=req.body
        User.findOne({email}).then(user=>{
        if(!user){
         
          res.status(404).json({message:"not found user"})
        }else{
          bcrypt.compare(password, user.password)
          .then(isMatch=>{
            if(!isMatch){
              
              res.status(404).json({message:"incorrect password"})
            }else{
                var token = jwt.sign({ 
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    status: user.status,
                                    // worksAt: user.worksAt,
                                    // relationship: user.relationship,
                                    // country: user.country,
                                    // livesIn: user.livesIn, 
                                   }, process.env.PRIVATE_KEY,  { expiresIn: '1h' });
                                   res.status(200).json({
                                     message: "success",
                                     token: "Bearer "+token,
                                     role: user.role,
                                     
                                   })
            }
          })
        }
      })
      
   } catch (error) {
    res.status(404).json(error.message);
   }
  }
module.exports = {
    Register,
    Login
}