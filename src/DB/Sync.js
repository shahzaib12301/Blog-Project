import UserModel from "../Model/User/User.js";
import BlogPostModel from "../Model/BlogPost/BlogPost.js";

const SyncDB=async()=>{
    try{
        await UserModel.sync({
            alter:true,
            force:false
        });
        await BlogPostModel.sync({
            alter:true,
            force:false
        });
        console.log("Model synchronization successful!");
    }
    catch(e){
        console.log(`Model synchronization failed: ${e.message}`);
    }
  
}
export default SyncDB;