'use strict'
const Database = use('Database')
const Note = use('App/Model/Note')
const Validator = use('Validator')

class HomeController {
    * index(request, response){
        yield response.sendView('main');
    }

    * notes(request, response){
        const notes = yield Note.all();

        yield response.sendView('notes', {
            notes: notes.toJSON()
        });
    }

    * todos(request, response){
        const todos = yield Todo.all();

        yield response.sendView('todos',{
            todos: todos.toJSON()
        });
    }

    * loginSignUp(request, response){
        yield response.sendView('loginSignUp');
    }
}

module.exports = HomeController
