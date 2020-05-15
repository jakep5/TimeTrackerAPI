const express = require('express');
const path = require('path');

const TaskService = require('./tasks-service');

const tasksRouter = express.Router();

const jsonBodyParser = express.json();

tasksRouter
    .route('/')
    