import BlogPostModel from "../../Model/BlogPost/BlogPost.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage=multer.diskStorage({
    destination: 'src/Images/Upload',
    filename:  (req, file, cb)=> {
         cb(null, `${Date.now()}-${file.fieldname}-${path.extname(file.originalname)}`);
      }
})
const upload = multer({
    storage
  });


const BlogPostController = {
    create: async (req, res) => {
        try {
            const { title, content, author } = req.body;
            const imagePath = req.file ? req.file.path : null;
            const blogPost = await BlogPostModel.create({
                title, content, author, userId:req.user.id, image:imagePath
            });
            if (blogPost) {
                return res.status(201).json({ status: true, message: 'Blog post created successfully.', blogPost });
            }
            else{
                return res.status(201).json({ status: true, message: 'Blog post Not Created.'});
            }
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while creating blog post.${e.message}` });
        }
    },
    update: async (req, res,next) => {
        try {
            const {id}=req.params;
            const { title, content, author,image } = req.body;
            const imagePath = req.file ? req.file.path : null;
            let Post = await BlogPostModel.findOne({ where: { id: id } });
            if (Post) {
                fs.unlink(Post.image, (err) => {
                    if (err) {
                        res.status(500).send("Error deleting image");
                        return;
                    }
                });
                Post.title = title;
                Post.content = content;
                Post.author = author;
                Post.image =  imagePath;
                Post.userId = req.user.id;
                await Post.save(); 
                return res.status(200).json({ status: true, message: 'Post updated successfully.', Post });
            } else {
                return res.status(404).json({ status: false, message: 'Post not found.' });
            }
        } catch (e) {
            return res.status(500).json({ status: false, error: `An error occurred while updating Post.${e.message}` });
           }
        },
        delete: async (req, res) => {
            try {
                const {id}=req.params;
                const Post = await BlogPostModel.findOne({ where: { id: id } });
                if (Post) {
                    fs.unlink(Post.image, (err) => {
                        if (err) {
                            res.status(500).send("Error deleting image");
                            return;
                        }
                    });
                    await Post.destroy();
                    return res.status(200).json({ status: true, message: 'Post deleted successfully.' });
                } else {
                    return res.status(404).json({ status: false, message: 'Post not found.' });
                }
            } catch (e) {
                return res.status(500).json({ status: false, error: `An error occurred while deleting Post.${e.message}` });
            }
        },
        index: async (req, res) => {
            try {
                const {id}=req.params;
                const Post = await BlogPostModel.findByPk(id);
                if (Post) {
                    return res.status(200).json({ status: true, message: Post });
                } else {
                    return res.status(404).json({ status: false, message: 'Post not found.' });
                }
            } catch (e) {
                return res.status(500).json({ status: false, error: `An error occurred while deleting Post.${e.message}` });
            }
        },
        display: async (req, res) => {
            try {
               
                const Post = await BlogPostModel.findAll();
                if (Post) {
                    return res.status(200).json({ status: true, message: Post });
                } else {
                    return res.status(404).json({ status: false, message: 'Post not found.' });
                }
            } catch (e) {
                return res.status(500).json({ status: false, error: `An error occurred while deleting Post.${e.message}` });
            }
        },
        uploadImage: upload.single('image')
};

export default BlogPostController;
