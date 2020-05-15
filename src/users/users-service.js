const xss = require('xss');
const bcrypt = require('bcryptjs');

const REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
    putUserIntoDb(db, newUser) {
        return db
            .insert(newUser)
            .into('timetracker_users')
            .returning('*')
            .then(([user]) => user)
    },

    generateHashPassword(password) {
        return bcrypt.hash(password, 12)
    },

    getUserWithUserName(db, user_name) {
        return db('timetracker_users')
            .where({ user_name })
            .first()
            .then(user => !!user)
    },

    serializeUser(user) {
        return {
            id: user.id,
            user_name: xss(user.user_name),
            date_created: new Date(user.date_created)
        }
    },

    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must have a length greater than 8 characters'
        }

        if (password.length > 72) {
            return 'Password must have a length less than 72 characters'
        }

        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with a space'
        }

        if(!REGEX.test(password)) {
            return 'Password must contain 1 upper case, 1 lower case, and 1 special character'
        }
    }
}

module.exports = UsersService