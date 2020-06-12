'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class AdminSeeder {
  async run () {
    const admin = {
      first_name: 'Yileyma',
      last_name: 'Alfonso',
      email: 'admin@fruteria.com',
      password: '1234',
      role: 1
    }

    await User.create(admin)
  }
}

module.exports = AdminSeeder
