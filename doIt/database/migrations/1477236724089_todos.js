'use strict'

const Schema = use('Schema')

class TodosTableSchema extends Schema {

  up () {
    this.create('todos', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }

}

module.exports = TodosTableSchema
