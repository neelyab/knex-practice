const ShoppingService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    getById(knex, id){
        return knex.select('*').from('shopping_list').where('item_id', id).first()
    },
    deleteItem(knex, item_id){
        return knex.select('*').from('shopping_list').where({item_id}).delete()
    },
    updateItem(knex, item_id, itemContent){
        return knex.select('*').from('shopping_list').where({item_id}).update(itemContent)
    },
    insertItem(knex, newItem){
        return knex.insert(newItem).into('shopping_list').returning('*').then(row => {return row[0]})
    }
}
module.exports = ShoppingService