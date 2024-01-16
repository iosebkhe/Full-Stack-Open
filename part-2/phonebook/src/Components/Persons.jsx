import PropTypes from "prop-types";

const Persons = ({ persons, onDeletePerson }) => {
  return (
    persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}

        <button onClick={() => onDeletePerson(person.id)}>delete</button>
      </li>
    ))
  );
};


Persons.propTypes = {
  persons: PropTypes.array
};

export default Persons;