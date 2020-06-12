'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.group(() => {
  Route.post('/auth/login', 'AuthController.login')
  Route.post('/auth/logout', 'AuthController.logout')
}).prefix('api')

Route.group(() => {
  Route.get('/', 'UserController.index')
  Route.put('/update_password', 'UserController.updatePassword')
}).prefix('api/profile').middleware(['auth'])

Route.group(() => {
  Route.post('/', 'UserController.getAllUsers')
  Route.get('/:id', 'UserController.getUser')
  Route.post('/create', 'UserController.store')
  Route.put('/update/:id', 'UserController.update')
}).prefix('api/users')

Route.group(() => {
  Route.get('/', 'ProductController.index')
  Route.post('/create', 'ProductController.store')
  Route.get('/:id', 'ProductController.show')
  Route.put('/:id', 'ProductController.update')

  // Incomes
  Route.get('/income', 'IncomeController.index')
  Route.post('/income', 'IncomeController.store')
  Route.get('/income/:id', 'IncomeController.show')
}).prefix('api/products').middleware(['auth'])

Route.group(() => {
  Route.get('/', 'ProviderController.index')
  Route.get('/:id', 'ProviderController.show')
  Route.post('/', 'ProviderController.store')
  Route.put('/:id', 'ProviderController.update')
}).prefix('api/providers').middleware(['auth'])

Route.any('*', 'NuxtController.render')