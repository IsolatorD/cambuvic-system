'use strict'
const { validate } = use('Validator')
const Encryption = use('Encryption')
const JsonException = use('App/Exceptions/JsonException')
const ValidationException = use('App/Exceptions/ValidationException')

class AuthController {
  async login ({ request, auth }) {
    const rules = {
      email: 'required|email',
      password: 'required|string'
    }
    const { email, password } = request.all()
    const validation = await validate({ email, password }, rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    try {
      const token = await auth
        .withRefreshToken()
        .query((builder) => {
          builder.whereNot('role', 3)
        })
        .attempt(email, password)
      return { token }
    } catch (error) {
      throw new JsonException({ error })
    }
  }

  async logout ({ auth, request }) {
    const { refreshToken } = request.all()
    const decryptedToken = Encryption.decrypt(refreshToken)
    await auth.user
      .tokens()
      .where('token', decryptedToken)
      .update({ is_revoked: true })
    return { success: true }
  }
}

module.exports = AuthController
