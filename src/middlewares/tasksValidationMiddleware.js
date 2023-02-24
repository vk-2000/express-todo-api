const Joi = require("joi");
const HTTPerror = require("../utils/errors/HTTPerror");

const createTaskSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
});

const updateTaskSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    isComplete: Joi.boolean()
});

const createTaskValidation = async (req, res, next) => {
    try{
        const data = req.body;
        const {value, error} = createTaskSchema.validate(data);
        if(error){
            throw new HTTPerror(error.message, 400);
        }
        next();
    }
    catch(err){
        if(err instanceof HTTPerror){
            res.status(err.code).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    }
    
};

const updateTaskValidation = (req, res, next) => {

    try{
        const data = req.body;
        const {value, error} = updateTaskSchema.validate(data);
        if(error){
            throw new HTTPerror(error.message, 400);
        }
        next();
    }
    catch(err){
        if(err instanceof HTTPerror){
            res.status(err.code).send(err.message);
        }
        else{
            res.status(500).send(err.message);
        }
    }

};

module.exports = {createTaskValidation, createTaskSchema, updateTaskValidation, updateTaskSchema};