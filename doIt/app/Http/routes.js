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
Route.post('editNote/:id', 'NotesController.doEdit')
Route.post('addCategory', 'TodosController.addCategory')
Route.get('/createTodo', 'TodosController.create')
Route.post('createTodo','TodosController.doCreate')
Route.get('/editTodo/:id', 'TodosController.edit')
Route.post('editTodo/:id', 'TodosController.doEdit')
Route.post('/editCategory/:id', 'TodosController.editCategory')
Route.get('deleteTodo/:id','TodosController.delete')
Route.get('/deleteCategory/:id','TodosController.deleteCategory')

Route.group('ajax', function () {
  Route.delete('/deleteNote/:id', 'NotesController.ajaxDelete')
  Route.delete('/deleteTodo/:id', 'TodosController.ajaxDelete')
  Route.delete('/deleteCategory/:id', 'TodosController.ajaxDeleteCategory')
  Route.post('/editTodo/:id', 'TodosController.ajaxEdit')
  Route.post('/editNote/:id','NotesController.ajaxEdit')
  Route.post('/createNote', 'NotesController.ajaxCreate')
  Route.post('/createTodo', 'TodosController.ajaxCreate')
}).prefix('/ajax')

// Route.group('ajax', function () {
//   Route.delete('/deleteTodo/:id', 'TodosController.ajaxDelete')
// }).prefix('/ajax')