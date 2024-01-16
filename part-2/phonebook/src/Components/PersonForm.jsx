import PropTypes from "prop-types";

const PersonForm = ({ addPerson, onNameChange, onNumberChange, newName, newNumber }) => {
  return (
    <form id='phonebook-form' onSubmit={addPerson}>
      <div>
        name: <input type='text' id='name-input' value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input type='text' id='number-input' value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func,
  onNameChange: PropTypes.func,
  onNumberChange: PropTypes.func,
  newName: PropTypes.string,
  newNumber: PropTypes.string
};

export default PersonForm;