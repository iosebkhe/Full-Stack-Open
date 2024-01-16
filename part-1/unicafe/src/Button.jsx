const Button = function (props) {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
};

export default Button;