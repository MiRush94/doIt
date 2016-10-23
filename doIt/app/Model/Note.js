'use strict'

const Lucid = use('Lucid')

class Note extends Lucid {
    user(){
        return this.belongsTo('App/Model/User')
    }
}

module.exports = Note
