const app = require('./app');
const knex = require('knex');
const { PORT } = require('./config');
const { DATABASE_URL } = require('./config');

const db = knex({
    client: 'pg',
    connection: DATABASE_URL
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})