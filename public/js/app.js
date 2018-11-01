(function() {
    initQuill();
    attachAddNoteHandling();
    attachSaveNoteChangesHandling();
    attachDeleteNoteHandling();

    function initQuill() {
        const editor = document.querySelector('#editor');
        if (!editor) return;

        var quill = new Quill('#editor', {
            modules: {
                toolbar: '#toolbar',
                syntax: true
            },
            theme: 'snow'
        });

        hljs.configure({languages: ['javascript']});
        quill.root.spellcheck = false;
        quill.root.focus();
        quill.root.blur();
    }


    function attachAddNoteHandling() {
        const addNoteBtn = document.querySelector('.btn-add');
        if (!addNoteBtn) return;
        const textarea = document.querySelector('textarea.hidden');
        const form = document.querySelector('#add-note-form');
        const qlEditor = document.querySelector('.ql-editor');

        addNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            textarea.value = qlEditor.innerHTML;
            form.submit();
        });
    }
    

    function attachSaveNoteChangesHandling() {
        const saveNoteBtn = document.querySelector('.btn-save');
        if (!saveNoteBtn) return;

        const textarea = document.querySelector('textarea.hidden');
        const form = document.querySelector('#edit-note-form');
        const qlEditor = document.querySelector('.ql-editor');

        saveNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            textarea.value = qlEditor.innerHTML;
            form.submit();
        });
    }


    function attachDeleteNoteHandling() {
        const deleteNoteBtn = document.querySelector('.btn-delete')
        if (!deleteNoteBtn) return;
        const form = document.querySelector('#delete-note-form');

        deleteNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            form.submit();
        });
    }

}(window));