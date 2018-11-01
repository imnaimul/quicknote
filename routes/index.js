const express = require('express');
const router = express.Router();
const debug = require('debug')('app');
const models = require('../models');
const url = require('url');
const {Note} = models;

router.get('/', (req, res) => {
    res.redirect('/notes');
});

// show all notes
router.get('/notes', (req, res) => {
    let {query} = url.parse(req.url, true);

    Note.find({})
        .then(notes => {
            if (typeof query.category === 'string')
                notes = notes.filter(note => {
                    return (note.tags.indexOf(query.category) !== -1)
                });

            res.render('notes/index', {
                title: 'Dashboard - quicknote',
                notes: notes
            });
        });
});

// create a new note
router.get('/notes/new', (req, res) => {
    res.render('notes/new', {
        title: 'Create a new note'
    });
});


// show a single note
router.get('/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            res.render('notes/single', {
                title: note.title,
                note: note
            });
        });
}); 

// create a new note
router.post('/notes/new', (req, res) => {
    let {title, body, tags} = req.body;
    tags = tags.split(',');
    tags.forEach((tag, i) => {tags[i] = tag.trim();});

    let newNote;
    newNote = new Note({title,body,tags});

    newNote.save()
        .then(post => {
            req.flash('successMsg', 'Successfully added the note.');
            res.redirect('/notes');
        })
        .catch((validateResult) => {
            req.flash('errorMsg', validateResult.errors.title.message.toString());
            res.redirect('/notes/new');
        });
});

// update an existing note
router.put('/notes/:id', (req, res) => {
    let {title, body, tags} = req.body;
    tags = tags.split(',');
    tags.forEach((tag, i) => {tags[i] = tag.trim();});


    Note.findByIdAndUpdate(req.params.id, {title: title, body: body, tags: tags})
        .then(note => {
            req.flash('successMsg', 'Successfully updated the note.');
            res.redirect(`/notes/${note._id}`);
        });
});

router.get('/notes/edit/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            let tags = '';
            note.tags.forEach((tag, i) => {
                if (i !== note.tags.length - 1)
                    tags += `${tag}, `;
                else
                    tags += tag;
            });

            res.render('notes/edit', {
                title: `Edit ${note.title} - quicknote`,
                note: note,
                tags: tags
            });
        });
});

router.delete('/notes/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(post => {
            req.flash('successMsg', 'Successfully deleted the note.');
            res.redirect('/notes');
        });
});

module.exports = router;