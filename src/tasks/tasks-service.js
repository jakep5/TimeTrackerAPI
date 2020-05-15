const xss = require('xss');

const TaskService = {
    insertTaskIntoDb(db, task) {
        console.log('here');
        return db
            .insert(task)
            .into('timetracker_tasks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    serializeTask(task) {
        return {
            id: task.id,
            name: xss(task.name),
            hours: task.hours,
            priority: xss(task.priority),
            user_id: task.user_id
        }
    }
}

module.exports = TaskService;