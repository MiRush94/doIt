'use strict'
const User = use('App/Model/User')
const Hash = use('Hash')

class RegisterOrAuthController {
    * login(request, response) {
        const username = request.input('username')
        const password = request.input('password')

        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        // Attempt to login with username and password
        const authCheck = yield request.auth.attempt(username, password)

        if (authCheck) {
            return response.redirect('/')
        }
        yield response.sendView('loginSignUp', { error: loginMessage.error })
    }

    * logout(request, response) {
        yield request.auth.logout()

        return response.redirect('/')
    }

    * doRegister(request, response) {
        const user = new User()
        user.username = request.input('inputUsername')
        user.email = request.input('inputEmail')
        user.password = yield Hash.make(request.input('inputPassword'))
        user.confirmPassword = yield Hash.make(request.input('inputConfirmPassword'))

        yield user.save()

        var registerMessage = {
            success: 'Registration Successful! Now go ahead and login'
        }

        yield response.sendView('loginSignUp', { registerMessage : registerMessage })
    }
}

module.exports = RegisterOrAuthController
