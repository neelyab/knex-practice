const ShoppingService = require('../src/shopping-list-service')
require('dotenv').config()
const {expect}= require('chai')
const supertest = require('supertest')
pg = require('pg') 
pg.types.setTypeParser(1700, 'text', parseFloat) 
knex = require('knex')

describe('ShoppingService Object', function(){
    let db 
    let shoppingItems = [
        {
            item_id: 1,
            item_name: 'fish sticks', 
            item_price: 12.00, 
            category: 'main', 
            checked: true, 
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {   item_id: 2,
            item_name: 'sauce', 
            item_price: 1.01, 
            category: 'snack', 
            checked: false, 
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {   item_id: 3,
            item_name: 'apple', 
            item_price: 13.22, 
            category: 'snack', 
            checked: false, 
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
    ]
    before('setup db', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        });
      });
    
      // Before all tests run and after each individual test, empty the
      // blogful_articles table
      before('clean db', () => db('shopping_list').truncate());
      afterEach('clean db', () => db('shopping_list').truncate());
    
      // After all tests run, let go of the db connection
      after('destroy db connection', () => db.destroy());
    
      describe('when no data is in the array', () => {
        it('returns an empty array', () => {
          return ShoppingService
            .getAllItems(db)
            .then(items => expect(items).to.eql([]));
        });
        it('inserts a new item',()=>{
            const newItem= {
            item_name: 'fish sticks', 
            item_price: 12.00, 
            category: 'main', 
            checked: true, 
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            }
            return ShoppingService.insertItem(db, newItem)
            .then(() => ShoppingService.getAllItems(db))
            .then(result =>{
                expect(result[0]).to.eql({item_id: 1,...newItem})
            })
        })

    
        context('with data present', () => {
          beforeEach('insert test items', () =>
            db('shopping_list')
              .insert(shoppingItems)
          );
    
          it('returns all test articles', () => {
            return ShoppingService
              .getAllItems(db)
              .then(items => expect(items).to.eql(shoppingItems));
          });
          it('returns an item by id', () => {
              const itemId = 2
              const itemWithId = shoppingItems[itemId-1]
            return ShoppingService
            .getById(db, itemId)
            .then(item=>{
              expect(item).to.eql({
                item_id: itemWithId.item_id,
                item_name: itemWithId.item_name, 
                item_price: itemWithId.item_price, 
                category: itemWithId.category, 
                checked: itemWithId.checked, 
                date_added: itemWithId.date_added
              })  
            })
          })
        it('deletes an item',()=>{
            const articleId = 3
            return ShoppingService.deleteItem(db, articleId)
            .then(() => ShoppingService.getAllItems(db))
            .then(result => {
                const expected = shoppingItems.filter(item => item.item_id !== articleId)
                expect(result).to.eql(expected)
            })
        })
        it('updates content',()=>{
            const updatedContent = {item_name: 'hello', 
            item_price: 13.20, 
            category: 'snack', 
            checked: true, 
            date_added: new Date()
            }
            const item_id = 3
            return ShoppingService.updateItem(db, item_id, updatedContent)
            .then(()=> ShoppingService.getById(db, item_id))
            .then(result=>{
                expect(result).to.eql({
                    item_id: item_id,
                    ...updatedContent
                })
            })
        })
        });
      });
    })