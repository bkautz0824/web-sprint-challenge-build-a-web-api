// add middlewares here related to actions
const Actions = require('./actions-model')


async function validateActionId(req, res, next) {
    try{
        const action = await Actions.get(req.params.id)
        if(!action){
            res.status(404)
            next()
        } else {
            req.action = action;
            next()
        }
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    validateActionId
}