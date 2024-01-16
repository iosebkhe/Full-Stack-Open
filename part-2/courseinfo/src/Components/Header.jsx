import PropTypes from "prop-types";

const Header = (props) => {
  return <h2>{props.name}</h2>;
};

Header.propTypes = {
  name: PropTypes.string
};

export default Header;