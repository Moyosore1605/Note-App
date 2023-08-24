const btnEl = document.getElementById('btn');
const notesDisplayEl = document.getElementById('notesDisplay');

const deleteNote = (id, element) => {
    console.log(id,element);
    const warning = confirm('Are you sure you want to delete this note?');
    if (warning) {
        const notes = getNotes().filter((note) => note.id != id);
        saveNotes(notes);
        notesDisplayEl.removeChild(element);
    }
}

const updateNote = (id, content) => {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNotes(notes);
}

const createNoteEl = (id, content) => {
    const element = document.createElement('textarea');
    element.placeholder = 'Empty Note';
    element.value = content;
    element.id = id;
    element.addEventListener('dblclick', ()=>{ deleteNote(id,element)});
    element.addEventListener('input', () => {updateNote(id,element.value)});
    return element;
}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const getNotes = () => {
    return JSON.parse(localStorage.getItem('notes') || '[]');
}

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    notesDisplayEl.insertBefore(noteEl,btnEl);
})

const addNote = () => {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    notesDisplayEl.insertBefore(noteEl,btnEl);
    notes.push(noteObj);
    saveNotes(notes);
}

btnEl.addEventListener('click', addNote)