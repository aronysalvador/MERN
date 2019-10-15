const express = require('express');
const router = express.Router();

const Task = require('../models/task');

//Busca la data en el BBDD
router.get('/', async (req, res) => {
    const task = await Task.find();   
    res.json(task);

}); 

//Optiene solo una tarea
router.get('/:id', async (req,res) =>{
      const task =  await Task.findById(req.params.id);
      res.json(task);
})


//Guarda la data en el BBDD
router.post('/', async (req,res) =>{
    const {title, description} = req.body;
    const task = new Task({
        title:title,
        description:description
    });
    await task.save();
    res.json({status: 'Tarea Guardada'});
});

//Actualiza la data en BBDD
router.put('/:id', async(req,res) =>{
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    
    res.json('Tarea actualizada');

})

//Elimina la data en BBDD
router.delete('/:id', async (req,res) => {
     await Task.findByIdAndRemove(req.params.id);
     res.json('Tarea Eliminada');
})

module.exports = router;
