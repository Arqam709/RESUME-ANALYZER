const express = require("express")

const authController = require("../controllers/auth.controller")

const { authuser } = require("../middlewares/auth.middleware");

const authRouter = express.Router()

//When this URL is hit, which controller should run? 

authRouter.post("/register", authController.registerUserController)

authRouter.post("/login", authController.loginUserController)

authRouter.get("/logout", authController.logoutUserController)

//protected route, only accessible to authenticated users, we will use the authuser middleware to protect this route. If the user is authenticated, the authuser middleware will call the next() function and allow the request to reach the getMeController. If the user is not authenticated, the authuser middleware will return a 401 Unauthorized response and prevent access to the getMeController.
authRouter.get("/get-me", authuser , authController.getMeController)







module.exports = authRouter