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
    },

    getAllTasks(db) {
        return db
            .from('timetracker_tasks AS task')
            .select(
                'task.id',
                'task.name',
                'task.hours',
                'task.priority'
            )
    },

    getUserTasks(db, userId) {
        return TaskService.getAllTasks(db)
        .where('user_id', userId)
    },

    deleteTask(db, id) {
        return db
            .from('timetracker_tasks')
            .where({id})
            .delete()
    },

    editTask(db, id, task) {
        return db
            .from('timetracker_tasks')
            .where({ id })
            .update({
                name: task.name,
                hours: task.hours,
                priority: task.priority
            })
    }
}

module.exports = TaskService;