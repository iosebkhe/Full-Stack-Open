const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

//built in middleware in express
//automatically parses incoming json to js object
app.use(express.json());
// handles cors problems
app.use(cors());
// telling express from where it should serve static files
app.use(express.static('dist'));

// Custom Morgan token to log request body for POST requests
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  } else {
    return '';
  }
});

// Use the custom token in Morgan format
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post-data')
);

// index.html file will be rendered from dist directory
app.get("/", (request, response) => {
  response.send("HELLO WORLD");
});

//get all persons
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        response.json(persons);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//get single person
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//delete single resource
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(person => {
      console.log(person);
      response.status(204).end();
    })
    .catch(error => next(error));
});

//add new person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => next(error));

});

//update person
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const id = request.params.id;

  const updatePerson = {
    name: name,
    number: number,
  };

  Person.findByIdAndUpdate(id, updatePerson, { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));

});

//get info when the request happened
app.get("/info", async (request, response, next) => {
  try {
    const personsLength = await Person.countDocuments({}).exec();
    response.send(`<p>phonebook has info for ${personsLength} people</p>
                    <p>${new Date()}</p>`);
  } catch (error) {
    next(error);
  }
});

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  } else if (error.code === 11000) {
    return response.status(400).send({ error: "Duplication error" });
  }

  next(error);
};

//last middleware should be this because it should have access to all routes.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});