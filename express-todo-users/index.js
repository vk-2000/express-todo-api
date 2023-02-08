const express = require('express');
const app = express();
const port = 4000;

const usersRouter = require('./src/routes/users');
const loginRouter = require('./src/routes/login');
const tokenRouter = require('./src/routes/token');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/token', tokenRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));