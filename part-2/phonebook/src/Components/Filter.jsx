import PropTypes from "prop-types";

const Filter = ({ onFilterChange, filterName }) => {
  return (
    <div>
      filter shown with <input type='text' id='filter-input' value={filterName} onChange={onFilterChange} />
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  filterName: PropTypes.string
};

export default Filter;