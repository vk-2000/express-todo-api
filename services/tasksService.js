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

const getAllTasks = () => tasks;

const createTask = (data) => {
    data.id = id++;
    data.isCompleted = false;
    tasks.push(data);
    return data;
}
const deleteFinishedTasks = () => {
    tasks = tasks.filter((task) => !task.isCompleted);
}
const getTaskById = (id) => {
    const index = tasks.findIndex(x => x.id == id);
    if(index === -1){
        throw new Error("Task not found");
    }
    return tasks[index];
}
const updateTask = (id, data) => {
    const index = tasks.findIndex(x => x.id == id);
    if(index === -1){
        throw new Error("Task not found");
    }
    Object.assign(tasks[index], data);
    return tasks[index];
}
module.exports = {getAllTasks, createTask, deleteFinishedTasks, getTaskById, updateTask}