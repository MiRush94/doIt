'use strict'
const Database = use('Database')
const Category = use('App/Model/Category')
const Note = use('App/Model/Todo')
const Validator = use('Validator')

class TodosController {
    * create(request, response){
        const categories = yield Category.all()
        yield response.sendView('createTodo', {
            categories: categories.toJSON()
        });
    }

    * doTodoCreate(request, response){
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

        todoData.user_id = 1;
        const todo = yield Todo.create(todoData);
        response.redirect('/todos');
    }
}

module.exports = TodosController
