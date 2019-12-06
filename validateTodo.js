const Joi = require('joi');
function validateTodo(todo) {
    const schema = {
        task: Joi.string().required(),
        status: Joi.string().required()
    };
    
    return Joi.validate(todo, schema);
}
exports.validateTodo = validateTodo;
