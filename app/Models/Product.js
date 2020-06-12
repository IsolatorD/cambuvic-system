'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const TYPES_SELL = [
  {
    id: 1,
    name: 'Kg'
  },
  {
    id: 2,
    name: 'C/U'
  }
]
class Product extends Model {
  static getTypes() {
    return TYPES_SELL
  }

  static getTypeById(type) {
    return TYPES_SELL.find(f => f.id === type)
  }

  static getTypeByName(type) {
    return TYPES_SELL.find(f => f.name === type)
  }

  incomes () {
    return this.hasMany('App/Models/Income')
  }
}

module.exports = Product
