const Joi = require("joi");
const HTTPerror = require("../utils/errors/HTTPerror");

const createTaskValidation = async (req, res, next) => {
    try{
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            isImportant: Joi.boolean()
                .required()
        });
        const data = req.body;
        const {value, error} = schema.validate(data);
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

const udateTaskValidation = (req, res, next) => {

    try{
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30),
            isImportant: Joi.boolean(),
            isComplete: Joi.boolean()
        });
        const data = req.body;
        const {value, error} = schema.validate(data);
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

module.exports = {createTaskValidation, udateTaskValidation};