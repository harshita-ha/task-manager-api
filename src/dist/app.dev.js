"use strict";

var express = require('express');

require('./db/mongoose');

var userRouter = require('./routers/user');

var taskRouter = require('./routers/task');

var app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
module.exports = app;