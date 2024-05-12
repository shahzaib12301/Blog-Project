import "dotenv/config";
import express from "express";
import AllRoutes from "./Routes/AllRoutes.js";
import { DBConnection } from "./DB/Config.js";
import SyncDB from "./DB/Sync.js";
import session from "express-session";



const App=express(); 
const Port=3300;
App.use(express.json());
App.use(session({
    secret:process.env.SESSION_KEY , 
    resave: false,
    saveUninitialized: false
}));
App.use("/",AllRoutes);

DBConnection();
SyncDB();

App.use((req, res) => {
    res.status(404).json({ status: false, message: 'Route not found.' });// in case of no route found
});







App.listen(Port,(error)=>{
    if(error){
        console.log("The Server is not listening")
    }else{
        console.log(`Server is started at http://localhost:${Port}`)
    }

});