import Joi from "joi";

const UserValidation={

    create:(req,res,next)=>{
        try{
            const data=req.body;
            const schema=Joi.object({
                username:Joi.string().min(5).max(35).required(),
                age:Joi.number().min(2).max(99).required(),//less than or equal to 99
                phone:Joi.string().pattern(/^\d{11}$/).required(),//number only has 11 digits
                email:Joi.string().email().required(),
                password:Joi.string().min(6).required(),
                });
            const validated= schema.validate(data);
            if(validated.error){
                return res.status(500).json({status:false , error:validated.error.details});
              }
              next();
        }catch(e){
            return res.status(500).json({status:false , error:e.message});
          }
    },

    delete:(req,res,next)=>{
        try{
            const data=req.body;
            const schema=Joi.object({
                email:Joi.string().email().required(),
                });
            const validated= schema.validate(data);
            if(validated.error){
                return res.status(500).json({status:false , error:validated.error.details});
              }
              next();
        }catch(e){
            return res.status(500).json({status:false , error:e.message});
          }
    },

    login:(req,res,next)=>{
        try{
            const data=req.body;
            const schema=Joi.object({
                email:Joi.string().email().required(),
                password:Joi.string().min(6).required(),
                });
            const validated= schema.validate(data);
            if(validated.error){
                return res.status(500).json({status:false , error:validated.error.details});
              }
              next();
        }catch(e){
            return res.status(500).json({status:false , error:e.message});
          }
    }
}
export default UserValidation;