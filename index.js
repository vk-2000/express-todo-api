const express = require("express");
const tasksRouter = require("./src/routes/tasksRoutes");
const port=3000;

var app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(port, () => {
    console.log("Server started");
});
