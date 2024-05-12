import { Router } from "express";
import UserController from "../../Controller/User/User.js";
import AuthUser from "../../Controller/Authuser/user.js";
import UserValidation from "../../Validation/User.js";

const user_routes=Router();
user_routes.post("/login",UserValidation.login,AuthUser.login);//->user/login route
user_routes.post("/logout",AuthUser.logout);//->user/logout route
user_routes.post("/register",UserValidation.create,UserController.create);//->user/create route
user_routes.put("/update",UserValidation.create,UserController.update);//->user/update route
user_routes.delete("/delete",UserValidation.delete,UserController.delete);//->user/delete route


export default user_routes;