var express = require('express');
const { getAllUsers, AddUser, DeleteUser, getByiD, updateUser } = require('../controllers/admin.ctr');
const {verifyToken} = require('../middleware/grade');

const { ROLES, inRole } =require('../middleware/Role')
var router = express.Router();
 
/* admin page. */
//inStatus(Status.Active) houwa c'est deja m ynajem yod5e kan kif ykoun active  ,
router.get('/all',verifyToken,inRole(ROLES.Admin),getAllUsers)
router.post('/add' ,verifyToken,inRole(ROLES.Admin), AddUser)
router.delete('/del/:id' ,verifyToken,inRole(ROLES.Admin), DeleteUser)
router.get('/getbyid/:id',verifyToken,inRole(ROLES.Admin), getByiD)
router.patch('/update/:id' ,verifyToken,inRole(ROLES.Admin),updateUser)


module.exports = router;