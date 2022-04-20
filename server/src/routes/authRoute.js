const AuthController = require("../app/controllers/AuthController");
const { route } = require("./postRoute");
const router = require("express").Router();

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);

module.exports = router;
