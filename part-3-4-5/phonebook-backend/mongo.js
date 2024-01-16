const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide mongo db password");
  process.exit(1);
}

const password = process.argv[2];

const mongoURI = `mongodb+srv://phonebookfullstack:${password}@cluster0.tz2kpwf.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoURI);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length > 3) {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
