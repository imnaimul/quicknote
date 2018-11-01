const express = require('express');
const router = express.Router();
const debug = require('debug')('app');
const models = require('../models');
const url = require('url');
const {Note} = models;

// redirect all request to '/notes'
router.get('/', (req, res) => {
    res.redirect('/notes');
});

// show all notes route
router.get('/notes', async (req, res) => {
    // parse the queries
    let {query} = url.parse(req.url, true);
    // save all the notes coming from database
    let notes = await Note.find({});

    // Make sure if query.category is there, it should be string
    if (typeof query.category === 'string')
        // filter out notes using the category query string
        notes = notes.filter(note => note.tags.indexOf(query.category) !== -1);

    // finally render the index template
    res.render('notes/index', {
        title: 'Dashboard - quicknote',
        notes: notes
    });
});

// create note route
router.get('/notes/new', (req, res) => {
    // render the new note template
    res.render('notes/new', {
        title: 'Create a new note'
    });
});


// show single note route
router.get('/notes/:id', async (req, res) => {
    // try fetching the note using the unique id
    try {
        let note = await Note.findById(req.params.id);

        // render the single note template
        res.render('notes/single', {
            title: note.title,
            note: note
        });
    } 
    // if it's not found, flash error message
    catch (err) {
        req.flash('errorMsg', 'The note you are trying to acess doesn\'t exist. :(');
        res.redirect('/notes');
    }

}); 

// create note route
router.post('/notes/new', async (req, res) => {
    // get the form data
    let {title, body, tags} = req.body;

    // tags was string, but let's convert it into an array and then store it
    tags = tags.split(',');
    tags.forEach((tag, i) => {tags[i] = tag.trim();});

    // create a new note instance, which we will save using the save() method
    let newNote = new Note({title, body, tags});
    
    // try saving the post, and redirect with flash message if successful
    try {
        await newNote.save();
        req.flash('successMsg', 'Successfully added the note.');
        res.redirect('/notes');
    } 

    // if there are any validation error, the catch block will run 
    // for example when the user don't send any title
    catch (validateResult) {
        req.flash('errorMsg', validateResult.errors.title.message.toString());
        res.redirect('/notes/new');
    }

});

// update note route
router.put('/notes/:id', async (req, res) => {
    // get the form data
    let {title, body, tags} = req.body;

    // tags is a string, but we want to convert it to an array and store
    tags = tags.split(',');
    tags.forEach((tag, i) => {tags[i] = tag.trim();});

    // try updating the post and redirect to the note with flash message if successful
    try {
        let updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, body, tags}, { runValidators: true });
        req.flash('successMsg', 'Successfully updated the note.');
        res.redirect(`/notes/${updatedNote._id}`);
    }
    // if there are any validation error, the catch block will run 
    // for example when the user don't send any title
    catch (validateResult) {
        req.flash('errorMsg', validateResult.errors.title.message.toString());
        res.redirect(`/notes/${req.params.id}`);
    }
    
});

// Edit note route
router.get('/notes/edit/:id', async (req, res) => {
    // try fetching the note
    try {
        let note = await Note.findById(req.params.id);
        let tags = '';

        // since on our editor, tags is a string, but tags is stored as an array
        // we need to convert the array to equivalent string before we render the template
        note.tags.forEach((tag, i) => {
            if (i !== note.tags.length - 1)
                tags += `${tag}, `;
            else
                tags += tag;
        });
        
        // render the edit template
        res.render('notes/edit', {
            title: `Edit ${note.title} - quicknote`,
            note: note,
            tags: tags
        });
    } 

    // if it's not found, flash error message
    catch (err) {
        req.flash('errorMsg', 'The note you are trying to edit doesn\'t exist.');
        res.redirect('/notes');
    }
});

router.delete('/notes/:id', async (req, res) => {

    // try deleting note using the id
    try {
        await Note.findByIdAndRemove(req.params.id);
        req.flash('successMsg', 'Successfully deleted the note.');
        res.redirect('/notes');
    }

    // if the note itself doesn't exist
    catch (err) {
        req.flash('errorMsg', 'The note you are trying to delete doesn\'t exist.');
        res.redirect('/notes');
    }
});

module.exports = router;