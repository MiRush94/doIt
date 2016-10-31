'use strict'
const Database = use('Database')
const Note = use('App/Model/Note')
const User = use('App/Model/User')
const Validator = use('Validator')

class NotesController {

    * create(request,response){

        yield response.sendView('createNote')
    }

    * doCreate(request,response){
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
        const user = User.find(1);
        noteData.user_id = request.currentUser.id;
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
        if (!note) {
        response.notFound('Note not found.')
        return
}
    }
    * edit(request,response){
        const id = request.param('id');
        const note = yield Note.find(id);

        yield note.load();

        yield response.sendView('editNote', {
            note: note.toJSON()
        })
    }

    * doEdit(request,response){
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

        const id = request.param('id');
        const note = yield Note.find(id);
        note.name = request.input('name'); 
        note.content = request.input('content');
        yield note.save();
        response.redirect('/notes');
    }

    * delete(request,response){
        const id = request.param('id');
        const note = yield Note.find(id);

        yield note.delete();
        response.redirect('/notes');
    }
}

module.exports = NotesController
