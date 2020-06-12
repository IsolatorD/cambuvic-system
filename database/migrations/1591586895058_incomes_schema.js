'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IncomesSchema extends Schema {
  up () {
    this.create('incomes', (table) => {
      table.increments()
      table.double('quantity', 255).notNullable()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
      table.integer('provider_id', 255).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('incomes')
  }
}

module.exports = IncomesSchema
