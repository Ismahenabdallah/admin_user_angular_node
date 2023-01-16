const Status = {
  Active: "Active",
  Desactive: "Desactive",
};
const jwt = require("jsonwebtoken");
require("dotenv").config();
//methode one besoin de req.user
const inStatus =
  (...status) =>
  (req, res, next) => {
    const active = status.find((a) => req.user.status === a);
   
    if (!active) {
      return res.status(401).json({ message: "please active your account" });
    }
    next();
  };


module.exports = {
  inStatus,
  
  Status,
};
