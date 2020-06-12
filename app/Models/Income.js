'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Income extends Model {
  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = Income
