'use strict'

const Route = use('Route')

Route.get('/','HomeController.index')
Route.get('/notes', 'HomeController.notes')
Route.get('/todos', 'HomeController.todos')
Route.get('/loginSignUp', 'HomeController.loginSignUp')
Route.post('login', 'RegisterOrAuthController.login')
Route.post('register', 'RegisterOrAuthController.doRegister')
Route.get('/logout', 'RegisterOrAuthController.logout')
Route.get('/createNote','NotesController.create')
Route.post('createNote', 'NotesController.doCreate')
Route.get('/showNote/:id', 'NotesController.show')
Route.get('/editNote/:id', 'NotesController.edit')
Route.get('/deleteNote/:id', 'NotesController.delete')
Route.post('/editNote/:id', 'NotesController.doEdit')