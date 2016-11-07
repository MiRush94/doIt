'use strict'
const Database = use('Database')
const Category = use('App/Model/Category')
const Todo = use('App/Model/Todo')
const Validator = use('Validator')

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
        const categories = yield Category.all()
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

        const id = request.param('id');
        const todo = yield Todo.find(id);
        todo.title = request.input('title');
        todo.category_id = request.input('category_id');
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
        
        // for(var i=todos.length; i = 0 ; --i){
        //     todos.splice(i,1);
        // }
        
        // yield category.delete(todos);
        yield category.delete();
        // console.log(todos.length);
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
        console.log(category.name);
        yield category.save();
        response.redirect('/todos');
    }
}

module.exports = TodosController
