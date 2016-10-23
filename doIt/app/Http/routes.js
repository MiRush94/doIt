'use strict'

const Route = use('Route')

Route.get('/','HomeController.index')
Route.get('/notes', 'HomeController.notes')
Route.get('/todos', 'HomeController.todos')
Route.get('/loginSignUp', 'HomeController.loginSignUp')