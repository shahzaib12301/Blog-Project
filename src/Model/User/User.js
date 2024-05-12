import sequelize from "../../DB/Config.js";
import { DataTypes } from "sequelize";

const UserModel=sequelize.define("user",{
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age:{
        type:DataTypes.INTEGER, 
        allowNull: false,
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false, 
    },
});

export default UserModel;