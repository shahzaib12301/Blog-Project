import {Sequelize} from "sequelize";

const ENV=process.env;
const sequelize = new Sequelize(ENV.DB_name,ENV.DB_username, ENV.DB_password, {
    host:ENV.DB_host,
    dialect:ENV.DB_dialect,
    logging:false
  }
);  
  export const DBConnection=async()=>{
    try{
       await sequelize.authenticate();
       console.log("DB is Connected Successfully!")
    }catch(e){
        console.log(`DB is Not Connected:${e.message}`)
       }
    
}

export default sequelize;