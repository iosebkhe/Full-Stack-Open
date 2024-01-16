import PropTypes from "prop-types";

const Total = ({ parts }) => {
  return (
    <p><strong> total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</strong></p>
  );
};

Total.propTypes = {
  parts: PropTypes.array
};

export default Total;