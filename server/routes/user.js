const express = require("express"),
  router = express.Router();
<<<<<<< HEAD
const Controller = require('../controllers/user');
=======
const Controller = require("../controllers/user");

router.post("/register", Controller.register);
router.post("/login",Controller.login);
router.post("/renewaccesstoken",Controller.renewaccesstoken);
module.exports = router;
>>>>>>> master