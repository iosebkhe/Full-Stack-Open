import PropTypes from "prop-types";
import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNewNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: true
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNewNote}>
        <input
          id="new-note-input"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          autoComplete="On"
          placeholder="write notes content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default NoteForm;