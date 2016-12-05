'use strict'
const Database = use('Database')
const Category = use('App/Model/Category')
const Todo = use('App/Model/Todo')
const Validator = use('Validator')
var http = require('http');

class TodosController {
    * create(request, response){
        const categories = yield Category.all()
        yield response.sendView('createTodo', {
            categories: categories.toJSON()
        });
    }

    * doCreate(request, response){
        const todoData = request.except('_csrf');

        const rules = {
            title:'required',
            category_id:'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }
        console.log(todoData);
        todoData.user_id = request.currentUser.id;
        const todo = yield Todo.create(todoData);
        response.redirect('/todos');
    }

    * addCategory(request,response){
        const categoryData = request.except('_csrf');
        const rules = {
            name:'required'
        }
        const validation = yield Validator.validateAll(categoryData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }
        categoryData.user_id = request.currentUser.id;
        const category = yield Category.create(categoryData);
        response.redirect('/createTodo');
    }

    * edit(request,response){
        const categories = yield Category.query().where('user_id', request.currentUser.id).fetch()
        const id = request.param('id');
        const todo = yield Todo.find(id);
        yield todo.related('category').load();
        yield response.sendView('editTodo', {
            todo: todo.toJSON(),
            categories: categories.toJSON()
        })
    }

    * doEdit(request,response){
        const todoData = request.except('_csrf');

        const rules = {
            title:'required|min:1|',
            category_id:'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }

        const id = request.param('id');
        const todo = yield Todo.find(id);
        todo.title = todoData.title;
        todo.category_id = todoData.category_id;
        yield todo.save();
        response.redirect('/todos');
    }

    * delete(request,response){
        const id = request.param('id');
        const todo = yield Todo.find(id);

        yield todo.delete();
        response.redirect('/todos');
    }

    * deleteCategory(request,response){
        const id = request.param('id');
        const category = yield Category.find(id);
        const todos = yield category.todos().fetch();
        
        yield category.delete();
        response.redirect('/todos');
    }

    * editCategory(request,response){
        const categoryData = request.except('_csrf');

        const rules = {
            name:'required',
        };
        const validation = yield Validator.validateAll(categoryData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }

        const id = request.param('id');
        const category = yield Category.find(id);
        category.name = categoryData.name;
        yield category.save();
        response.redirect('/todos');
    }

    * ajaxDelete(request, response) {
        
        const id = request.param('id');
        const todo = yield Todo.find(id);

        if (todo) {
            if (request.currentUser.id != todo.user_id) {
                response.unauthorized('Access denied.')
                return
            }

            yield todo.delete()
            response.ok({
                success: true
            })
            return
        }
        response.notFound('No todo');
  }

  * ajaxDeleteCategory(request, response) {
        
        const id = request.param('id');
        const category = yield Category.find(id);

        if (category) {
            if (request.currentUser.id != category.user_id) {
                response.unauthorized('Access denied.')
                return
            }

            yield category.delete()
            response.ok({
                success: true
            })
            return
        }
        response.notFound('No category');
  }

  * ajaxEdit(request,response) {
        const todoData = request.except('_csrf');
        console.log(todoData);

        const id = request.param('id');
        const todo = yield Todo.find(id);
                
        const rules = {
            title:'required',
            category_id:'required'
        };
        const validation = yield Validator.validateAll(todoData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }

        if (todo) {
            if (request.currentUser.id != todo.user_id) {
                response.unauthorized('Access denied.')
                return
            }
            
            todo.title = todoData.title;
            todo.category_id = todoData.category_id;
            yield todo.save();
            console.log(todo);
            response.ok({
                success: true
            })
            return
        }
        response.notFound('No todo');
    }

  * ajaxCreate(request,response){
      const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/loginSignUp')
        }
        const todoData = request.except('_csrf')
        const rules={
            title:'required',
            category_id:'required',
        }

        const validation = yield Validator.validateAll(noteData, rules);

        if(validation.fails()){
            response.ok({
                success: false   
        })
            return
        }
        todoData.user_id = request.currentUser.id;
        const todo = yield Todo.create(todoData)
        response.ok({
                success: true   
        })
    }
}

module.exports = TodosController
