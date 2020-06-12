'use strict'

const { validate } = use('Validator')
const JsonException = use('App/Exceptions/JsonException')
const ValidationException = use('App/Exceptions/ValidationException')

const Provider = use('App/Models/Provider')

class ProviderController {
  async index ({ request }) {
    const providers = await Provider.all()
    return providers
  }

  async store ({ request }) {
    const rules = {
      name: 'required|string',
      identification: 'required|integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      name,
      identification,
      address
    } = request.all()
    try {
      let provider = await Provider.query().where('identification', identification).first()
      if (provider) {
        throw new JsonException('provider_already_exist')
      }

      await Provider.create({
        name,
        identification,
        address
      })

      return { success: true }
    } catch (error) {
      throw new JsonException({error})
    }
  }

  async show ({ params }) {
    try {
      const provider = await Provider.find(params.id)
      if (!provider) {
        throw new JsonException('provider_not_found')
      }

      return provider
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async update ({request, params}) {
    const rules = {
      name: 'string',
      indentification: 'integer',
      address: 'string'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      name,
      identification,
      address
    } = request.all()

    try {
      const provider = await Provider.find(params.id)

      if (!provider) {
        throw new JsonException('provider_not_found')
      }

      provider.merge({
        name,
        identification,
        address
      })

      await provider.save()

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }
}

module.exports = ProviderController
