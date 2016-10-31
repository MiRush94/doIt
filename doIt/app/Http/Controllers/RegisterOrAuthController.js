'use strict'
const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')

class RegisterOrAuthController {
    * login(request, response) {
        const username = request.input('username')
        const password = request.input('password')

        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        // Attempt to login with username and password
        try {
        const authCheck = yield request.auth.attempt(username, password)
        if (authCheck) {
            return response.redirect('/')
        }
        }catch(e){
            yield response.sendView('loginSignUp', { error: e.message })
        }
    }

    * logout(request, response) {
        yield request.auth.logout()

        return response.redirect('loginSignUp')
    }

    * doRegister(request, response) {
        const user = new User()
        const userData = request.except('_csrf')
       
        const rules = {
            inputUsername : 'required|alpha_numeric|min:6|max:20|unique:users, username',
            inputEmail    : 'required|email|unique:users, email',
            inputPassword : 'required',
            inputConfirmPassword: 'same:inputPassword'
        }

        const validation = yield Validator.validateAll(userData, rules);
        
        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }

        user.username = userData.inputUsername;
        user.email = userData.inputEmail;
        user.password = yield Hash.make(userData.inputPassword);
        user.confirmPassword = yield Hash.make(userData.inputConfirmPassword)

        yield user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        yield response.sendView('loginSignUp', { registerMessage : registerMessage })
    }
}

module.exports = RegisterOrAuthController
