'use strict'

class HomeController {
    * index(request, response){
        yield response.sendView('main');
    }

    * notes(request, response){
        yield response.sendView('notes');
    }

    * todos(request, response){
        yield response.sendView('todos');
    }

    * loginSignUp(request, response){
        yield response.sendView('loginSignUp');
    }
}

module.exports = HomeController
