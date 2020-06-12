'use strict'

const { validate } = use('Validator')
const JsonException = use('App/Exceptions/JsonException')
const ValidationException = use('App/Exceptions/ValidationException')

const Product = use('App/Models/Product')

class ProductController {
  async index ({request}) {
    try {
      let products = await Product.query().with('incomes').fetch()
      products = products.toJSON()

      const promises = products.map(async product => {
        let totalIncomes = 0
        await product.incomes.forEach(income => {
          totalIncomes += income.quantity
        })

        return {...product, totalIncomes}
      })

      products = await Promise.all(promises)
      return {products, type_sells: Product.getTypes()}
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async store ({request}) {
    const rules = {
      name: 'required|string',
      price: 'required|integer',
      type_sell: 'required|integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      name,
      price,
      type_sell
    } = request.all()

    try {
      await Product.create({
        name,
        price,
        type_sell
      })

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async show ({params}) {
    try {
      const product = await Product.find(params.id)
      if (!product) {
        throw new JsonException('product_not_found')
      }

      return product
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async update ({request, params}) {
    const rules = {
      name: 'required|string',
      price: 'integer',
      type_sell: 'integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      name,
      price,
      type_sell
    } = request.all()

    try {
      const product = await Product.find(params.id)

      if (!product) {
        throw new JsonException('product_not_found')
      }

      product.merge({
        name,
        price,
        type_sell
      })

      await product.save()

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }
}

module.exports = ProductController
