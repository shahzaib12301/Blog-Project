import sequelize from "../../DB/Config.js";
import UserModel from "../User/User.js";
import { DataTypes } from "sequelize";

const BlogPostModel=sequelize.define("blogpost",{
    title:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content:{
        type:DataTypes.STRING, 
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    createdAt: 'creation_date',
});
UserModel.hasMany(BlogPostModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
 });
 BlogPostModel.belongsTo(UserModel);

export default BlogPostModel;