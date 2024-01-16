import PropTypes from "prop-types";

const Part = (props) => {
  return (<p>{props.name} {props.exercise}</p>);
};

Part.propTypes = {
  name: PropTypes.string,
  exercise: PropTypes.number
};

export default Part;