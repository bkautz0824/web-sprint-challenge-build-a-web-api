
const express = require('express')
const { validateProjectId, validateProject } = require('./projects-middleware')
const Projects = require('./projects-model')



const router = express.Router()


router.get('/', async (req,res) => {
    try{
        const projects = await Projects.get()
        if(projects){
            res.status(200).json(projects)
        }
    } catch(error){
        console.log(error)
    }
   
    
})

router.get('/:id', validateProjectId, (req, res) => {
   res.json(req.project)
})


router.delete('/:id', validateProjectId, async (req, res) => {
    try{
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})



router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', (req, res) => {
 
    const {name, description, completed} = req.body
        if(!name || !description || !completed){
            res.status(400);
            next()
        } else {
            Projects.insert(req.body)
            .then(newPost => {
                res.json(newPost)
            })
            .catch(err => {
                res.status(500)
                console.log(err)
            })
        }
})

router.put('/:id', async (req, res) => {
    try {
        if(req.body.name && typeof req.body.completed === 'boolean' && req.body.description){
        let result = await Projects.update(req.params.id, req.body)
        res.status(200).json({
            name: result.name,
            description: result.description,
            completed: result.completed
        })}
        else{
            res.status(400).json({message:"error"})
            return
        }
    } catch(err) {
        console.log(err)
    }
   
        
   
})











module.exports = router