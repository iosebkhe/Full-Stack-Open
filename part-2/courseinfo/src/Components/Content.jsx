import Part from './Part';
import PropTypes from "prop-types";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)}
    </>
  );
};

Content.propTypes = {
  parts: PropTypes.array
};

export default Content;