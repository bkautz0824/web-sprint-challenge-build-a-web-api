// Write your "actions" router here!
const express = require('express')
const { validateActionId } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const actions = await Actions.get()
        if(actions){
            res.status(200).json(actions)
        }

    } catch(error){
        console.log(error)
    }
   
    
})

router.get('/:id', validateActionId, (req, res) => {
   res.json(req.action)
})

router.delete('/:id', validateActionId, async (req, res) => {
    try{
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})


router.post('/', (req, res) => {
 
    const {notes, description, project_id} = req.body
        if(!notes || !description || !project_id){
            res.status(400);
            next()
        } else {
            Actions.insert(req.body)
            .then(newAction => {
                res.json(newAction)
            })
            .catch(err => {
                res.status(500)
                console.log(err)
            })
        }
    
    
})


router.put('/:id', (req,res) => {
    const {notes, description, completed, project_id} = req.body
    if(!notes || !description || !completed || !project_id){
        res.status(400)
        next()
    } else {
        Actions.update(req.params.id, req.body)
        .then(action => {
            res.json(action)
        })
        .catch(err => {
            console.log(err)
        })
    }
})


        
   


















module.exports = router