console.log('hello, practice')
const knex = require('knex')
require('dotenv').config()

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})
console.log('pg and knex installed correctly')

function searchForName(searchTerm){
    knexInstance 
    .select('item_name')
    .from('shopping_list')
    .where('item_name', 'ILIKE', `%${searchTerm}%`)
    .then(result=>
        console.log(result))

}

searchForName('Tofurkey');

function paginateProducts(page){
    const productsPerPage = 6
    const offset = productsPerPage * (page-1)
    knexInstance
    .select('item_name', 'item_price','date_added', 'checked', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result=>
        console.log(result))
}

paginateProducts(4)

function getItemsAfterDate(daysAgo){
    knexInstance
    .select('date_added')
    .from('shopping_list')
    .where('date_added', 
    '>',
    knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result =>
        console.log(result))
}

getItemsAfterDate(2)

function getTotalPrice(){
    knexInstance
    .select('category')
    .from('shopping_list')
    .sum('item_price')
    .groupBy('category')
    .then(results =>
        console.log(results))
}

getTotalPrice();