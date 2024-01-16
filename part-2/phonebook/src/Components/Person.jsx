import PropTypes from "prop-types";

const Person = ({ filteredPersons, onDeletePerson }) => {
  return (
    filteredPersons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}

        <button onClick={() => onDeletePerson(person.id)}>delete</button>
      </li>
    ))
  );
};

Person.propTypes = {
  filteredPersons: PropTypes.array,
};

export default Person;