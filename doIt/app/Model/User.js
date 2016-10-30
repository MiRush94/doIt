'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static scopeActive (builder) {
    builder.where('status', 'active')
  } 

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
  todos(){
    return this.hasMany('App/Model/Todo')
  }
  categories(){
    return this.hasMany('App/Model/Category')
  }
  notes(){
    return this.hasMany('App/Model/Note')
  }

}

module.exports = User
