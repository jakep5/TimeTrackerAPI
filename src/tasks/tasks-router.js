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

    /*Get User's Games*/
    .get((req, res, next) => {
        TaskService.getUserTasks(
            req.app.get('db'),
            req.headers.user_id
        )
        .then(tasks => {
            res.json(tasks.map(TaskService.serializeTask));
        })
        .catch(next);
    })


/*Individual game operations */
tasksRouter 
    .route('/id/:taskId')

    /*Delete a user's task */
    .delete((req, res, next) => {
        TaskService.deleteTask(
            req.app.get('db'),
            req.params.taskId
        )
            .then(res.status(204))
    })

    /*Edit task properties */
    .patch(jsonBodyParser, (req, res, next) => {
        TaskService.editTask(
            req.app.get('db'),
            req.params.taskId,
            req.body
        )
    })


module.exports = tasksRouter
