// add middlewares here related to projects
const Projects = require('./projects-model')


async function validateProjectId(req, res, next) {
    try{
        const project = await Projects.get(req.params.id)
        if(!project){
            res.status(404)
            next()
        } else {
            req.project = project;
            next()
        }
    } catch(err) {
        console.log(err)
    }
}





module.exports = {
    validateProjectId,
    
}