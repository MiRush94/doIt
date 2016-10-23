'use strict'
const Database = use('Database')
const Note = use('App/Model/Note')
const Validator = use('Validator')

class NotesController {
    

    * create(request,response){
        yield response.sendView('createNote')
    }

    * doCreateNote(request,response){
        const noteData = request.except('_csrf')

        const rules={
            name:'required',
            content:'required',
        }

        const validation = yield Validator.validateAll(noteData, rules);

        if(validation.fails()){
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()
            response.redirect('back');
            return
        }

        noteData.user_id=1;
        const note = yield Note.create(noteData)
        response.redirect('notes')
    }

    * show(request,response){

        const id = request.param('id');
        const note = yield Note.find(id);

        yield note.load();

        yield response.sendView('showNote', {
            note: note.toJSON()
        })
    }
}

module.exports = NotesController
