const Anecdote = function (props) {
  return (
    <p>{props.anecdotes[props.anecdoteIndex]}</p>
  );
};

export default Anecdote;