const Router = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const userController = require("../controllers/userController")
const validateMiddleware = require('../middleware/validate.middleware')

const router = new Router()

router.post("/registration", validateMiddleware, userController.registrationUser)
router.post("/login", userController.loginUser)
router.get("/auth", authMiddleware, userController.authUser)


module.exports = router