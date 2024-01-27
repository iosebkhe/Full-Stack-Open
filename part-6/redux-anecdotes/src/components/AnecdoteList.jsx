import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    return [...state].sort((a, b) => b.votes - a.votes);
  });


  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };


  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={vote}
          />
        )
      }
    </div>
  );
};

export default AnecdoteList;