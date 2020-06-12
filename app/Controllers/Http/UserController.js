'use strict'

const { validate } = use('Validator')
const Hash = use('Hash')

const User = use('App/Models/User')

const JsonException = use('App/Exceptions/JsonException')
const ValidationException = use('App/Exceptions/ValidationException')

class UserController {
  async index ({ response, auth }) {
    let { id } = auth.user
    try {
      let user = User.query()
        .where('id', id)
        .first()
      return user
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async updatePassword({ request, auth, response }) {
    const rules = {
      currentPassword: 'required',
      newPassword: 'required|string|confirmed' // enviar campo newPassword_confirmation para ejecutar esta regla
    }
    const { newPassword, currentPassword } = request.all()

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }
    const { user } = auth
    try {
      const isSame = await Hash.verify(currentPassword, user.password)
      if (!isSame) {
        return response.status(401).send(
          {
            message: 'user_password_not_match',
            field: 'currentPassword',
            validation: 'match'
          }
        )
      }
      user.password = newPassword
      await user.save()
      return { success: true }
    } catch (error) {
      console.log(error)
      throw new JsonException({ error })
    }
  }

  async getUser ({ params }) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .first()
      
      if (!user) {
        throw new JsonException('user_not_found')
      }

      return user
    } catch (error) {
      console.log(error)
      throw new JsonException({ error })
    }
  }

  async getAllUsers ({ request }) {
    const { role } = request.all()

    try {
      const query = User.query()
      .whereNot('role', 1)
      if (role) {
        query.where('role', role)
      }

      const users = await query.fetch()
      return {users, roles: User.getRoles() }
    } catch (error) {
      console.log(error)
      throw new JsonException({ error })
    }
  }

  async store ({ request }) {
    const rules = {
      first_name: 'required|string',
      last_name: 'required|string',
      email: 'required|string',
      password: 'string',
      role: 'required|integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      first_name,
      last_name,
      email,
      password,
      role
    } = request.all()

    try {
      const user = await User.query().where('email', email).first()
      if (user) {
        throw new JsonException('user_already_exist')
      }

      await User.create({
        first_name,
        last_name,
        email,
        password,
        role
      })

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async update ({ request, params }) {
    const rules = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      role: 'integer'
    }

    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const {
      first_name,
      last_name,
      email,
      role
    } = request.all()

    try {
      const userExist = await User.query()
        .where('email', email)
        .whereNot('id', params.id)
        .first()
      if (userExist) {
        throw new JsonException('user_email_already_taken')
      }

      const user = await User.find(params.id)

      if (!user) {
        throw new JsonException('user_not_found')
      }

      user.merge({
        first_name,
        last_name,
        email,
        role
      })

      await user.save()

      return { success: true }
    } catch (error) {
      throw new JsonException({ error })
    }
  }
}

module.exports = UserController
