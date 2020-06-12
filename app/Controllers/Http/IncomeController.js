'use strict'

const { validate } = use('Validator')
const JsonException = use('App/Exceptions/JsonException')
const ValidationException = use('App/Exceptions/ValidationException')

const Product = use('App/Models/Product')
const Provider = use('App/Models/Provider')
const Income = use('App/Models/Income')

class IncomeController {
  async index () {
    try {
      let incomesAll
      let incomes = Income.query().with('product').fetch()
      incomes = incomes.toJSON()

      const promises = incomes.map(async income => {
        let provider = null
        if (income.provider_id) {
          provider = await Provider.find(income.provider_id)
        }

        return {
          ...income,
          provider
        }
      })

      incomesAll = await Promise.all(promises)

      return incomesAll
    } catch (error) {
      throw new JsonException({error})
    }
  }

  async store ({ request }) {
    const rules = {
      quantity: 'required|number',
      product_id: 'required|integer',
      provider_id: 'integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      quantity,
      product_id,
      provider_id
    } = request.all()

    try {
      await Income.create({
        quantity,
        product_id,
        provider_id
      })

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async show ({params}) {
    try {
      const income = await Income.query()
        .where('id', params.id)
        .with('product')
        .first()

      if (!income) {
        throw new JsonException('income_not_found')
      }

      return income
    } catch (error) {
      throw new JsonException({ error })
    }
  }
}

module.exports = IncomeController
