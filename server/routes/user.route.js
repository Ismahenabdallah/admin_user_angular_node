var express = require('express');

const { Updatehimself, getHimself } = require('../controllers/user.ctr');
const {verifyToken} = require('../middleware/grade');

const { ROLES, inRole } =require('../middleware/Role')
var router = express.Router();

/*  user listing. */


router.post('/update' , verifyToken,inRole(ROLES.User), Updatehimself)
router.get("/get", verifyToken,inRole(ROLES.User), getHimself)

module.exports = router;
