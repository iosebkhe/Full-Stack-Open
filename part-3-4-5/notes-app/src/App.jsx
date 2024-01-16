import { useState, useEffect, useRef } from "react";
import Note from "./Components/Note";
import noteServices from "./services/notes";
import loginServices from "./services/login";
import Notification from "./Components/Notification";
import Footer from "./Components/Footer";
import LoginForm from "./Components/LoginForm";
import Togglable from "./Components/Togglable";
import NoteForm from "./Components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef(null);


  useEffect(() => {
    noteServices.getAll().then(initialNotes => {
      setNotes(initialNotes);
    }).catch(error => {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    //get toggleVisibility with ref
    noteFormRef.current.toggleVisibility();
    noteServices
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login(
        { username, password }
      );

      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      );
      noteServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    event.preventDefault();
    console.log('logging with', username, password);
  };

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );


  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );


  const handleLogOut = async (event) => {
    event.preventDefault();
    localStorage.removeItem('loggedNoteAppUser');
    setUser(null);
  };

  // toggle importance of notes
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteServices.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote));
    }).catch(error => {
      setErrorMessage(`${error.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  // show important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important);


  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
        ?
        loginForm()
        :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
          <button onClick={handleLogOut}>log out</button>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>

      <Footer />
    </div>
  );
};

export default App;