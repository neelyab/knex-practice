const knex = require('knex')
require('dotenv').config()
const ShoppingService = require('./shopping-list-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})
