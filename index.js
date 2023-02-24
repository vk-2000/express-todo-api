const express = require("express");
const cors = require("cors");
// const tasksRouter = require("./src/routes/tasksRoutes");
const listsRouter = require("./src/routes/listsRoutes");
const port=3000;

var app = express();
app.use(cors());
app.use(express.json());
// app.use("/tasks", tasksRouter);
app.use("/lists", listsRouter);



app.listen(port, () => {
    console.log("Server started");
});
