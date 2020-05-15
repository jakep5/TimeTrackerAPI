const express = require('express');
const path = require('path');
const {requireAuthentication} = require('../middleware/jwtAuthentication');

const TaskService = require('./tasks-service');

const tasksRouter = express.Router();

const jsonBodyParser = express.json();

/* tasksRouter.all(requireAuthentication.requireAuthentication) */

tasksRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        const newTask = {
            name: req.body.name,
            hours: req.body.hours,
            priority: req.body.priority,
            user_id: req.body.user_id
        }

        for (const [key, value] of Object.entries(newTask)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body, please include it.`}
                })
            }
        }

        TaskService.insertTaskIntoDb(
            req.app.get('db'),
            newTask
        )
            .then(task => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl + `/${task.id}`))
                    .json(TaskService.serializeTask(task))
            })
    })

module.exports = tasksRouter
