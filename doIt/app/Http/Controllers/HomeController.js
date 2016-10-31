'use strict'
const Database = use('Database')
const Note = use('App/Model/Note')
const Todo = use('App/Model/Todo')
const Category = use('App/Model/Category')
const User = use('App/Model/User')
const Validator = use('Validator')

class HomeController {
    * index(request, response){
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/loginSignUp')
        }
        yield response.sendView('main');
    }

    * notes(request, response){
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/loginSignUp')
        }
        const notes = yield Note.all();

        yield response.sendView('notes', {
            notes: notes.toJSON()
        });
    }

    * todos(request, response){
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/loginSignUp')
        }
        const categories = yield Category.all();

        for(let category of categories){
            const todos = yield category.todos().fetch();
            category.allTodos = todos.toJSON()
        }

        yield response.sendView('todos',{
            categories: categories.toJSON()
        })
    }

    * loginSignUp(request, response){
        yield response.sendView('loginSignUp');
    }
}

module.exports = HomeController
