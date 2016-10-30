'use strict'
const Database = use('Database')
const Note = use('App/Model/Note')
const User = use('App/Model/User')
const Validator = use('Validator')

class NotesController {

    * create(request,response){

        yield response.sendView('createNote')
        // const currentUser = request.User;
        // console.log(currentUser.user_id);
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

        noteData.user_id = 1;
        // console.log(request);
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
    * edit(request,response){
        const id = request.param('id');
        const note = yield Note.find(id);

        yield note.load();

        yield response.sendView('editNote', {
            note: note.toJSON()
        })
    }

    * doEdit(request,response){
        console.log(request);
        const id = request.param('id');
        const note = yield Note.find(id);

        note.fill({name: request.name, content: request.content})
        yield note.save();
        // response.redirect('/notes');
    }

    * delete(request,response){
        const id = request.param('id');
        const note = yield Note.find(id);

        yield note.delete();
        response.redirect('/notes');
    }
}

module.exports = NotesController
