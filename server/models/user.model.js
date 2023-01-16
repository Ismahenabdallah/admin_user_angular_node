const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   
    email: String, 
    password:String,
    confirm:String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String, 
      enum: ['Desactive', 'Active'],
      default: 'Active'
    },
    role:{
         type: String, 
        enum:['Admin', 'User'],
        default:'User'
    },
   
  
    
  },
  { timestamps: true }
  
  );
module.exports=mongoose.model('users',userSchema)