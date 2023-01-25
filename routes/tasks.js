var express = require('express');
var router = express.Router();


let tasks = [
    {
        id: 0,
        name: "1",
        isCompleted: false
    },
    {
        id: 1,
        name: "2",
        isCompleted: false
    },
    {
        id: 1,
        name: "3",
        isCompleted: true
    }
];
let id = 2;

router.get('/', function(req, res, next) {
  res.send(tasks)
});
router.post('/', (req, res) => {
    const data = req.body;
    data.id = id++;
    data.isCompleted = false;
    res.status(201);
    res.send(data);
})
router.get('/:id', (req, res) => {
    const index = tasks.findIndex(x => x.id == req.params.id);
    if(index === -1){
        res.send(404);
    }
    else{
        res.send(tasks[index])
    }
})
router.delete('/', (req, res) => {
    tasks = tasks.filter((task) => !task.isCompleted, tasks);
    console.log(tasks);
    res.end()
})
router.put('/:id', (req, res) => {
    const index = tasks.findIndex(x => x.id == req.params.id);
    if(index === -1){
        res.send(404);
    }
    Object.assign(tasks[index], req.body);
    res.send(tasks[index]);
})

module.exports = router;