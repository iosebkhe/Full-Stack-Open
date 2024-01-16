const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

// get all notes
notesRouter.get('/', async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
    response.json(notes);
  } catch (error) {
    next(error);
  }
});

// get one note with id
notesRouter.get("/:id", async (request, response, next) => {
  const id = request.params.id;
  try {
    const note = await Note.findById(id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// delete a note by id
notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    await Note.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// update a note by id
notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body;
  const id = request.params.id;

  const note = {
    content: content,
    important: important,
  };

  try {
    const noteToUpdate = await Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: "query" });
    response.status(201).json(noteToUpdate);
  } catch (error) {
    next(error);
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};


// add new note
notesRouter.post('/', async (request, response, next) => {
  const { content, important } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: content,
    important: important === undefined ? false : important,
    user: user.id
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();

    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;