const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');
const tasksRoutes = require('./tasksRoutes');

router.get('/', listsController.getAllLists);
router.post('/', listsController.createList);
router.get('/:listId', listsController.getListById);
router.put('/:listId', listsController.updateList);
router.delete('/:listId', listsController.deleteList);

router.use('/:listId/tasks', tasksRoutes)

module.exports = router;