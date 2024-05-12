import { Router } from "express";
import BlogPostController from "../../Controller/BlogPost/BlogPost.js";



const blog_post_routes=Router();
blog_post_routes.post("/create",BlogPostController.uploadImage,BlogPostController.create);//->blog/create route
blog_post_routes.put("/update/:id",BlogPostController.uploadImage,BlogPostController.update);//->blog/update/2  route
blog_post_routes.delete("/delete/:id",BlogPostController.delete);//->blog/delete/2  route
blog_post_routes.get("/index/:id",BlogPostController.index);//->blog/index/2  route
blog_post_routes.get("/display",BlogPostController.display);//->blog/display  route
export default  blog_post_routes;