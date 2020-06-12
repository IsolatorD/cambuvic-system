'use strict'

const Model = use('Model')

const ROLES = [
  {
    id: 1,
    name: 'Admin'
  },
  {
    id: 2,
    name: 'Cajero'
  },
  {
    id: 3,
    name: 'Trabajador'
  }
]
class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to bash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeSave', 'User.hashPassword')
  }

  static getRoles() {
    return ROLES
  }

  static getRoleById(role) {
    return ROLES.find(f => f.id === role)
  }

  static getRoleByName(role) {
    return ROLES.find(f => f.name === role)
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
