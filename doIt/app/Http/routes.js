'use strict'

const Route = use('Route')

Route.get('/','HomeController.index')
Route.get('/notes', 'HomeController.notes')
Route.get('/todos', 'HomeController.todos')
Route.get('/loginSignUp', 'HomeController.loginSignUp')
Route.post('login', 'RegisterOrAuthController.login')
Route.post('register', 'RegisterOrAuthController.doRegister')
Route.get('/logout', 'RegisterOrAuthController.logout')