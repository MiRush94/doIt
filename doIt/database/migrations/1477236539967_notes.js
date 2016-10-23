'use strict'

const Schema = use('Schema')

class NotesTableSchema extends Schema {

  up () {
    this.create('notes', (table) => {
      table.increments()
      table.string('name', 60).notNullable().unique()
      table.text('content').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('notes')
  }

}

module.exports = NotesTableSchema
