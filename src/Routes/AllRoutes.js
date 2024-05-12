import { Router } from "express";
import user_routes from "./User/User.js";
import blog_post_routes from "./BlogPost/BlogPost.js";
import AuthenticateMiddleware from "../Middleware/Authenticate.js";

const AllRoutes=Router();

AllRoutes.use("/user",user_routes);
AllRoutes.use("/blog",AuthenticateMiddleware,blog_post_routes);//middleware for protected routes

export default AllRoutes;